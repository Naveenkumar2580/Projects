package busReservationSystem;
import java.util.*;

class Bus {
    int busNo;
    String driverName;
    String destination;
    int totalSeats = 40;
    int bookedSeats = 0;

    Bus(int busNo, String driverName, String destination) {
        this.busNo = busNo;
        this.driverName = driverName;
        this.destination = destination;
    }

    boolean bookSeat(int seats) {
        if (seats <= availableSeats()) {
            bookedSeats += seats;
            return true;
        }
        return false;
    }

    int availableSeats() {
        return totalSeats - bookedSeats;
    }

    void displayBusInfo() {
        System.out.println("Bus No: " + busNo);
        System.out.println("Driver: " + driverName);
        System.out.println("Destination: " + destination);
        System.out.println("Available Seats: " + availableSeats());
        System.out.println("-----------------------------------");
    }
}

public class BusReservationSystem {
    static List<Bus> buses = new ArrayList<>();
    static Scanner scanner = new Scanner(System.in);

    public static void main(String[] args) {
        buses.add(new Bus(101, "Arun", "Chennai"));
        buses.add(new Bus(102, "Bala", "Madurai"));
        buses.add(new Bus(103, "Deepak", "Coimbatore"));

        int choice;
        do {
            System.out.println("\n--- Bus Reservation System ---");
            System.out.println("1. View All Buses");
            System.out.println("2. Book a Seat");
            System.out.println("3. Exit");
            System.out.print("Enter choice: ");
            choice = scanner.nextInt();

            switch (choice) {
                case 1:
                    viewAllBuses();
                    break;
                case 2:
                    bookSeats();
                    break;
                case 3:
                    System.out.println("Thank you for using our system!");
                    break;
                default:
                    System.out.println("Invalid choice. Try again.");
            }
        } while (choice != 3);
    }

    static void viewAllBuses() {
        for (Bus b : buses) {
            b.displayBusInfo();
        }
    }

    static void bookSeats() {
        System.out.print("Enter Bus No: ");
        int no = scanner.nextInt();
        Bus selectedBus = null;

        for (Bus b : buses) {
            if (b.busNo == no) {
                selectedBus = b;
                break;
            }
        }

        if (selectedBus == null) {
            System.out.println("Bus not found.");
            return;
        }

        System.out.print("Enter number of seats to book: ");
        int seats = scanner.nextInt();

        if (selectedBus.bookSeat(seats)) {
            System.out.println("Booking successful!");
        } else {
            System.out.println("Not enough available seats.");
        }
    }
}
