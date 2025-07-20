package ExpenseTracker;

import java.io.*;
import java.util.*;

public class ExpenseTracker {
    private static final String FILE_NAME = "expenses.txt";
    private static List<Expense> expenses = new ArrayList<>();
    private static Scanner sc = new Scanner(System.in);

    public static void main(String[] args) {
        loadExpensesFromFile();

        while (true) {
            System.out.println("\n=== EXPENSE TRACKER ===");
            System.out.println("1. Add Expense");
            System.out.println("2. View Expenses");
            System.out.println("3. View Total Spent");
            System.out.println("4. Exit");
            System.out.print("Choose: ");
            int choice = sc.nextInt();
            sc.nextLine();

            switch (choice) {
                case 1 -> addExpense();
                case 2 -> viewExpenses();
                case 3 -> viewTotal();
                case 4 -> {
                    saveExpensesToFile();
                    System.out.println("Saved & Exit.");
                    return;
                }
                default -> System.out.println("Invalid option.");
            }
        }
    }

    private static void addExpense() {
        System.out.print("Enter category (Food, Travel, etc.): ");
        String category = sc.nextLine();
        System.out.print("Enter description: ");
        String desc = sc.nextLine();
        System.out.print("Enter amount: ₹");
        double amount = sc.nextDouble();
        sc.nextLine();

        Expense exp = new Expense(category, desc, amount);
        expenses.add(exp);
        saveExpensesToFile();
        System.out.println("Expense added.");
    }

    private static void viewExpenses() {
        if (expenses.isEmpty()) {
            System.out.println("No expenses found.");
            return;
        }
        System.out.println("\nYour Expenses:");
        for (Expense e : expenses) {
            System.out.println("• " + e);
        }
    }

    private static void viewTotal() {
        double total = 0;
        for (Expense e : expenses) {
            total += e.getAmount();
        }
        System.out.printf("Total Spent: ₹%.2f\n", total);
    }

    private static void saveExpensesToFile() {
        try (BufferedWriter writer = new BufferedWriter(new FileWriter(FILE_NAME))) {
            for (Expense e : expenses) {
                writer.write(e.getCategory() + ";" + e.getDescription() + ";" + e.getAmount());
                writer.newLine();
            }
        } catch (IOException e) {
            System.out.println("Error saving expenses.");
        }
    }

    private static void loadExpensesFromFile() {
        File file = new File(FILE_NAME);
        if (!file.exists()) return;

        try (BufferedReader reader = new BufferedReader(new FileReader(FILE_NAME))) {
            String line;
            while ((line = reader.readLine()) != null) {
                String[] parts = line.split(";");
                if (parts.length == 3) {
                    String category = parts[0];
                    String desc = parts[1];
                    double amount = Double.parseDouble(parts[2]);
                    expenses.add(new Expense(category, desc, amount));
                }
            }
        } catch (IOException e) {
            System.out.println("Error loading expenses.");
        }
    }
}
