package ToDoListManager;
import java.io.*;
import java.util.*;

public class ToDoListManager {
    private static final String FILE_NAME = "tasks.txt";
    private static List<Task> tasks = new ArrayList<>();
    private static Scanner sc = new Scanner(System.in);

    public static void main(String[] args) {
        loadTasksFromFile();

        while (true) {
            System.out.println("\n=== TO-DO LIST MANAGER ===");
            System.out.println("1. Add Task");
            System.out.println("2. View Tasks");
            System.out.println("3. Mark Task as Done");
            System.out.println("4. Exit");
            System.out.print("Choose: ");

            int choice = sc.nextInt();
            sc.nextLine(); // consume newline

            switch (choice) {
                case 1 -> addTask();
                case 2 -> viewTasks();
                case 3 -> markTaskAsDone();
                case 4 -> {
                    saveTasksToFile();
                    System.out.println("Goodbye!");
                    return;
                }
                default -> System.out.println("Invalid choice.");
            }
        }
    }

    private static void addTask() {
        System.out.print("Title: ");
        String title = sc.nextLine();
        System.out.print("Description: ");
        String desc = sc.nextLine();
        System.out.print("Priority (1-High, 2-Med, 3-Low): ");
        int priority = sc.nextInt();
        sc.nextLine(); // consume newline

        Task newTask = new Task(title, desc, priority);
        tasks.add(newTask);
        saveTasksToFile();
        System.out.println("Task added!");
    }

    private static void viewTasks() {
        if (tasks.isEmpty()) {
            System.out.println("No tasks found.");
            return;
        }

        for (int i = 0; i < tasks.size(); i++) {
            Task t = tasks.get(i);
            String status = t.isCompleted() ? "[✔]" : "[ ? ]";
            System.out.printf("%d. %s %s (Priority: %d) - %s\n",
                    i + 1, status, t.getTitle(), t.getPriority(), t.getDescription());
        }
    }

    private static void markTaskAsDone() {
        viewTasks();
        if (tasks.isEmpty()) return;

        System.out.print("Enter task number to mark done: ");
        int num = sc.nextInt();
        sc.nextLine(); // consume newline

        if (num >= 1 && num <= tasks.size()) {
            Task t = tasks.get(num - 1);
            t.setCompleted(true);
            saveTasksToFile();
            System.out.println("Task marked as completed.");
        } else {
            System.out.println("Invalid task number.");
        }
    }

    private static void saveTasksToFile() {
        try (BufferedWriter writer = new BufferedWriter(new FileWriter(FILE_NAME))) {
            for (Task t : tasks) {
                writer.write(t.getTitle() + ";" + t.getDescription() + ";" + t.getPriority() + ";" + t.isCompleted());
                writer.newLine();
            }
        } catch (IOException e) {
            System.out.println("Error saving tasks.");
            e.printStackTrace();
        }
    }

    private static void loadTasksFromFile() {
        File file = new File(FILE_NAME);
        if (!file.exists()) return;

        try (BufferedReader reader = new BufferedReader(new FileReader(FILE_NAME))) {
            String line;
            while ((line = reader.readLine()) != null) {
                String[] parts = line.split(";");
                if (parts.length == 4) {
                    String title = parts[0];
                    String desc = parts[1];
                    int priority = Integer.parseInt(parts[2]);
                    boolean isCompleted = Boolean.parseBoolean(parts[3]);
                    tasks.add(new Task(title, desc, priority, isCompleted));
                }
            }
        } catch (IOException e) {
            System.out.println("Error loading tasks.");
            e.printStackTrace();
        }
    }
}
