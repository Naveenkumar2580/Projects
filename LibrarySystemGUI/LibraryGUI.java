package LibrarySystemGUI;

import javax.swing.*;
import java.awt.*;

public class LibraryGUI extends JFrame {
    private Library library;
    private JTextField idField, titleField, authorField, searchField;
    private JTextArea displayArea;

    public LibraryGUI() {
        library = new Library();
        setTitle("Library Management System");
        setSize(600, 400);
        setDefaultCloseOperation(EXIT_ON_CLOSE);
        setLayout(new BorderLayout());

        // Top panel for adding books
        JPanel topPanel = new JPanel(new GridLayout(2, 4));
        idField = new JTextField();
        titleField = new JTextField();
        authorField = new JTextField();

        topPanel.add(new JLabel("ID:"));
        topPanel.add(idField);
        topPanel.add(new JLabel("Title:"));
        topPanel.add(titleField);
        topPanel.add(new JLabel("Author:"));
        topPanel.add(authorField);

        JButton addBtn = new JButton("Add Book");
        addBtn.addActionListener(e -> addBook());
        topPanel.add(addBtn);

        // Center panel for displaying books
        displayArea = new JTextArea();
        displayArea.setEditable(false);
        JScrollPane scrollPane = new JScrollPane(displayArea);

        // Bottom panel for search/issue/return
        JPanel bottomPanel = new JPanel();
        searchField = new JTextField(10);
        JButton searchBtn = new JButton("Search");
        JButton issueBtn = new JButton("Issue");
        JButton returnBtn = new JButton("Return");

        searchBtn.addActionListener(e -> searchBook());
        issueBtn.addActionListener(e -> issueBook());
        returnBtn.addActionListener(e -> returnBook());

        bottomPanel.add(new JLabel("Book ID:"));
        bottomPanel.add(searchField);
        bottomPanel.add(searchBtn);
        bottomPanel.add(issueBtn);
        bottomPanel.add(returnBtn);

        // Add panels to frame
        add(topPanel, BorderLayout.NORTH);
        add(scrollPane, BorderLayout.CENTER);
        add(bottomPanel, BorderLayout.SOUTH);

        setVisible(true);
        refreshBookList();
    }

    private void addBook() {
        String id = idField.getText().trim();
        String title = titleField.getText().trim();
        String author = authorField.getText().trim();

        if (id.isEmpty() || title.isEmpty() || author.isEmpty()) {
            JOptionPane.showMessageDialog(this, "Please fill all fields");
            return;
        }

        Book book = new Book(id, title, author);
        library.addBook(book);
        refreshBookList();

        idField.setText("");
        titleField.setText("");
        authorField.setText("");
    }

    private void searchBook() {
        String id = searchField.getText().trim();
        Book book = library.searchBook(id);

        if (book != null) {
            JOptionPane.showMessageDialog(this, book.toString());
        } else {
            JOptionPane.showMessageDialog(this, "Book not found");
        }
    }

    private void issueBook() {
        String id = searchField.getText().trim();
        Book book = library.searchBook(id);

        if (book != null && !book.isIssued()) {
            library.issueBook(id);
            refreshBookList();
        } else {
            JOptionPane.showMessageDialog(this, "Cannot issue this book.");
        }
    }

    private void returnBook() {
        String id = searchField.getText().trim();
        Book book = library.searchBook(id);

        if (book != null && book.isIssued()) {
            library.returnBook(id);
            refreshBookList();
        } else {
            JOptionPane.showMessageDialog(this, "Cannot return this book.");
        }
    }

    private void refreshBookList() {
        StringBuilder sb = new StringBuilder();
        for (Book b : library.getBooks()) {
            sb.append(b).append("\n");
        }
        displayArea.setText(sb.toString());
    }
}
