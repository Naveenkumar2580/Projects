package ContactBook;

import java.io.*;
import java.util.*;

public class ContactBook {
    private static final String FILE_NAME = "contacts.ser";
    private static List<Contact> contacts = new ArrayList<>();
    private static final Scanner sc = new Scanner(System.in);

    public static void main(String[] args) {
        loadContacts();

        while (true) {
            System.out.println("\n=== CONTACT BOOK ===");
            System.out.println("1. Add Contact");
            System.out.println("2. View Contacts");
            System.out.println("3. Search Contact by Name");
            System.out.println("4. Exit");
            System.out.print("Choose: ");

            int choice = sc.nextInt();
            sc.nextLine(); // consume newline

            switch (choice) {
                case 1 -> addContact();
                case 2 -> viewContacts();
                case 3 -> searchContact();
                case 4 -> {
                    saveContacts();
                    System.out.println("Exiting...");
                    return;
                }
                default -> System.out.println("Invalid choice.");
            }
        }
    }

    private static void addContact() {
        System.out.print("Enter name: ");
        String name = sc.nextLine();
        System.out.print("Enter phone: ");
        String phone = sc.nextLine();
        System.out.print("Enter email: ");
        String email = sc.nextLine();

        contacts.add(new Contact(name, phone, email));
        saveContacts();
        System.out.println("Contact added!");
    }

    private static void viewContacts() {
        if (contacts.isEmpty()) {
            System.out.println("No contacts found.");
            return;
        }

        System.out.println("\n--- All Contacts ---");
        for (Contact c : contacts) {
            System.out.println(c);
        }
    }

    private static void searchContact() {
        System.out.print("Enter name to search: ");
        String search = sc.nextLine().toLowerCase();

        boolean found = false;
        for (Contact c : contacts) {
            if (c.getName().toLowerCase().contains(search)) {
                System.out.println(c);
                found = true;
            }
        }

        if (!found) {
            System.out.println("No contact found with that name.");
        }
    }

    private static void saveContacts() {
        try (ObjectOutputStream oos = new ObjectOutputStream(new FileOutputStream(FILE_NAME))) {
            oos.writeObject(contacts);
        } catch (IOException e) {
            System.out.println("Error saving contacts: " + e.getMessage());
        }
    }

    @SuppressWarnings("unchecked")
    private static void loadContacts() {
        File file = new File(FILE_NAME);
        if (!file.exists()) return;

        try (ObjectInputStream ois = new ObjectInputStream(new FileInputStream(FILE_NAME))) {
            contacts = (ArrayList<Contact>) ois.readObject();
        } catch (IOException | ClassNotFoundException e) {
            System.out.println("Error loading contacts: " + e.getMessage());
        }
    }
}
