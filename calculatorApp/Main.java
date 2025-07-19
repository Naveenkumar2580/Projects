package calculatorApp;
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        Calculator calc = new Calculator();
        int choice;

        do {
            System.out.println("\n===== JAVA CALCULATOR =====");
            System.out.println("1. Add");
            System.out.println("2. Subtract");
            System.out.println("3. Multiply");
            System.out.println("4. Divide");
            System.out.println("5. Square Root");
            System.out.println("6. Power (x^y)");
            System.out.println("7. Exit");
            System.out.print("Choose operation: ");
            choice = sc.nextInt();

            double num1, num2, result;

            switch (choice) {
                case 1 -> {
                    System.out.print("Enter two numbers: ");
                    num1 = sc.nextDouble();
                    num2 = sc.nextDouble();
                    result = calc.add(num1, num2);
                    System.out.println("Result: " + result);
                }
                case 2 -> {
                    System.out.print("Enter two numbers: ");
                    num1 = sc.nextDouble();
                    num2 = sc.nextDouble();
                    result = calc.subtract(num1, num2);
                    System.out.println("Result: " + result);
                }
                case 3 -> {
                    System.out.print("Enter two numbers: ");
                    num1 = sc.nextDouble();
                    num2 = sc.nextDouble();
                    result = calc.multiply(num1, num2);
                    System.out.println("Result: " + result);
                }
                case 4 -> {
                    System.out.print("Enter two numbers: ");
                    num1 = sc.nextDouble();
                    num2 = sc.nextDouble();
                    result = calc.divide(num1, num2);
                    System.out.println("Result: " + result);
                }
                case 5 -> {
                    System.out.print("Enter number: ");
                    num1 = sc.nextDouble();
                    result = calc.squareRoot(num1);
                    System.out.println("Square Root: " + result);
                }
                case 6 -> {
                    System.out.print("Enter base and exponent: ");
                    num1 = sc.nextDouble();
                    num2 = sc.nextDouble();
                    result = calc.power(num1, num2);
                    System.out.println("Result: " + result);
                }
                case 7 -> System.out.println("Exiting Calculator. Goodbye!");
                default -> System.out.println("Invalid option. Try again.");
            }

        } while (choice != 7);

        sc.close();
    }
}
