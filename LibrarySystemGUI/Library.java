package LibrarySystemGUI;

import java.util.ArrayList;

public class Library {
    private ArrayList<Book> books;

    public Library() {
        books = new ArrayList<>();
    }

    public void addBook(Book book) {
        books.add(book);
    }

    public Book searchBook(String id) {
        for (Book book : books) {
            if (book.getId().equalsIgnoreCase(id)) {
                return book;
            }
        }
        return null;
    }

    public void issueBook(String id) {
        Book book = searchBook(id);
        if (book != null && !book.isIssued()) {
            book.issue();
        }
    }

    public void returnBook(String id) {
        Book book = searchBook(id);
        if (book != null && book.isIssued()) {
            book.returnBook();
        }
    }

    public ArrayList<Book> getBooks() {
        return books;
    }
}
