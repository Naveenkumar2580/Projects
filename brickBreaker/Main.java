package brickBreaker;

import javax.swing.JFrame;

public class Main {
    public static void main(String[] args) {
        JFrame frame = new JFrame("Brick Breaker");
        GamePlay gamePlay = new GamePlay();

        frame.setBounds(10, 10, 700, 600);
        frame.setResizable(false);
        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        frame.add(gamePlay);
        frame.setVisible(true);
    }
}
