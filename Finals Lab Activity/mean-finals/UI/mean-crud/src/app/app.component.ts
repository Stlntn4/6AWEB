import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HttpClientModule,
    CommonModule,
    FormsModule
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  readonly APIUrl = "http://localhost:5038/api/books/";

  books: any[] = [];

  // Add form fields
  newTitle: string = '';
  newDesc: string = '';
  newPrice: number | null = null;
  newAuthor: string = '';
  newCategory: string = '';

  // Edit form fields
  editingId: any = null;
  editTitle: string = '';
  editDesc: string = '';
  editPrice: number | null = null;
  editAuthor: string = '';
  editCategory: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.refreshBooks();
  }

  refreshBooks() {
    this.http.get<any[]>(this.APIUrl + 'GetBooks')
      .subscribe(data => {
        this.books = data;
      });
  }

  addBook() {
    if (!this.newTitle || !this.newDesc || !this.newPrice || !this.newAuthor || !this.newCategory) {
      alert("Please fill all fields");
      return;
    }

    const body = {
      title: this.newTitle,
      desc: this.newDesc,
      price: this.newPrice,
      author: this.newAuthor,
      category: this.newCategory
    };

    this.http.post(this.APIUrl + 'AddBook', body)
      .subscribe(() => {
        this.refreshBooks();
        this.newTitle = '';
        this.newDesc = '';
        this.newPrice = null;
        this.newAuthor = '';
        this.newCategory = '';
      });
  }

  startEdit(book: any) {
    this.editingId = book.id;
    this.editTitle = book.title;
    this.editDesc = book.desc;
    this.editPrice = book.price;
    this.editAuthor = book.author;
    this.editCategory = book.category;
  }

  saveEdit(id: any) {
    if (!this.editTitle || !this.editDesc || !this.editPrice || !this.editAuthor || !this.editCategory) {
      alert("Please fill all fields");
      return;
    }

    const body = {
      title: this.editTitle,
      desc: this.editDesc,
      price: this.editPrice,
      author: this.editAuthor,
      category: this.editCategory
    };

    this.http.put(this.APIUrl + 'UpdateBook?id=' + id, body)
      .subscribe(() => {
        this.cancelEdit();
        this.refreshBooks();
      });
  }

  cancelEdit() {
    this.editingId = null;
    this.editTitle = '';
    this.editDesc = '';
    this.editPrice = null;
    this.editAuthor = '';
    this.editCategory = '';
  }

  deleteBook(id: any) {
    this.http.delete(this.APIUrl + 'DeleteBook?id=' + id)
      .subscribe(() => {
        this.refreshBooks();
      });
  }
}
