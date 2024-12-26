
import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

class Main extends Frame implements ActionListener {

    TextField display;
    Button  btn0,btn1,btn2,btn3,btn4,btn5,btn6,btn7,btn8,btn9,add,sub,mul,div,equal,clear;
     Main() {
    display = new TextField("0");
    display.setBounds(10, 30, 300, 50); // Adjusted for smaller width

    btn0 = new Button("0");
    btn0.setBounds(10, 300, 60, 60); // Reduced size for mobile
    btn0.addActionListener(this);

    btn1 = new Button("1");
    btn1.setBounds(10, 230, 60, 60);
    btn1.addActionListener(this);

    btn2 = new Button("2");
    btn2.setBounds(80, 230, 60, 60);
    btn2.addActionListener(this);

    btn3 = new Button("3");
    btn3.setBounds(150, 230, 60, 60);
    btn3.addActionListener(this);

    btn4 = new Button("4");
    btn4.setBounds(10, 160, 60, 60);
    btn4.addActionListener(this);

    btn5 = new Button("5");
    btn5.setBounds(80, 160, 60, 60);
    btn5.addActionListener(this);

    btn6 = new Button("6");
    btn6.setBounds(150, 160, 60, 60);
    btn6.addActionListener(this);

    btn7 = new Button("7");
    btn7.setBounds(10, 90, 60, 60);
    btn7.addActionListener(this);

    btn8 = new Button("8");
    btn8.setBounds(80, 90, 60, 60);
    btn8.addActionListener(this);

    btn9 = new Button("9");
    btn9.setBounds(150, 90, 60, 60);
    btn9.addActionListener(this);

    add = new Button("+");
    add.setBounds(220, 230, 60, 60);
    add.addActionListener(this);

    sub = new Button("-");
    sub.setBounds(220, 160, 60, 60);
    sub.addActionListener(this);

    mul = new Button("*");
    mul.setBounds(220, 90, 60, 60);
    mul.addActionListener(this);

    div = new Button("/");
    div.setBounds(220, 300, 60, 60);
    div.addActionListener(this);

    equal = new Button("=");
    equal.setBounds(80, 300, 60, 60);
    equal.addActionListener(this);

    clear = new Button("cl");
    clear.setBounds(150, 300, 60, 60);
    clear.addActionListener(this);

    add(display);
    add(btn0);
    add(btn1);
    add(btn2);
    add(btn3);
    add(btn4);
    add(btn5);
    add(btn6);
    add(btn7);
    add(btn8);
    add(btn9);
    add(add);
    add(sub);
    add(mul);
    add(div);
    add(equal);
    add(clear);

    setSize(350, 500); // Reduced size for mobile view
    setLayout(null);
    setTitle("Calculator");
    setVisible(true);
     }
        public void actionPerformed(ActionEvent e){

        if(e.getSource()==btn0){
            String expression=display.getText();
            expression +="0";
            display.setText(expression);
        }
        if(e.getSource()==btn1){
            String expression=display.getText();
            expression +="1";
            display.setText(expression);
        }
        if(e.getSource()==btn2){
            String expression=display.getText();
            expression +="2";
            display.setText(expression);
        }
        if(e.getSource()==btn3){
            String expression=display.getText();
            expression +="3";
            display.setText(expression);
        }
        if(e.getSource()==btn4){
            String expression=display.getText();
            expression +="4";
            display.setText(expression);
        }
        if(e.getSource()==btn5){
            String expression=display.getText();
            expression +="5";
            display.setText(expression);
        }
        
        if(e.getSource()==btn6){
            String expression=display.getText();
            expression +="6";
            display.setText(expression);
        }
        if(e.getSource()==btn7){
            String expression=display.getText();
            expression +="7";
            display.setText(expression);
        }
        if(e.getSource()==btn8){
            String expression=display.getText();
            expression +="8";
            display.setText(expression);
        }
        if(e.getSource()==btn9){
        String expression=display.getText();
        expression +="9";
        display.setText(expression);
        }
        if(e.getSource()==add){
            String expression=display.getText();
            expression +="+";
            display.setText(expression);
        }
        if(e.getSource()==sub){
            String expression=display.getText();
            expression +="-";
            display.setText(expression);
        }
        if(e.getSource()==mul){
            String expression=display.getText();
            expression +="*";
            display.setText(expression);
        }
        if(e.getSource()==div){
            String expression=display.getText();
            expression +="/";
            display.setText(expression);
        }    
        if(e.getSource()==clear){
            display.setText("0");
        }
        if(e.getSource()==equal){
            int a,b,i;
            char op='+';
            String expression=display.getText();
            String tempA="",tempB="";
            for(i=0;i<expression.length();i++){
                if(Character.isDigit(expression.charAt(i))){
                    tempA+=expression.charAt(i);
                }
                else{
                    op=expression.charAt(i);
                    break;
                }
            }
            tempB=expression.substring(i+1);
            a=Integer.parseInt(tempA);
            b=Integer.parseInt(tempB);

            int result=0;

            switch(op) {
                case '+':
                    result=a+b;
                    break;
                case '-':
                    result=a-b;
                    break;
                case '*':
                    result=a*b;
                    break;
                case '/':
                    result=a/b;
                    break;
            }
            display.setText(String.valueOf(result));
            }
        } 
    public static void main(String[] args) {
        new Main();
        
    }
    }
