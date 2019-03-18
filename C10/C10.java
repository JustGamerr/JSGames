/*
 Evan Halliday
 Programming 2
 March 29th, 2019
 Period 5
 Classwork #10
*/

import java.awt.Color;
import java.awt.Font;
import java.awt.Image;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import javax.swing.*;

public class C10 implements ActionListener
{
	private JFrame simpleQuizFrame;
	private JLabel titleTextLabel;
	private JLabel qTextLabel;
	private JLabel qThreeAnswerLabel;
	private JLabel tickLabel;
	private JLabel tickLabel2;
	private JLabel arrowLabel;
	private JLabel arrowLabel2;
	private JLabel xLabel;
	private JLabel showScoreLabel;
	private JButton submitAnswerButton;
	private JButton nextQButton;
	private JButton restartQuizButton;
	private JButton closeQuizButton;
	private JRadioButton qTwoOptOne;
	private JRadioButton qTwoOptTwo;
	private JRadioButton qTwoOptThree;
	private ButtonGroup qTwoGroup;
	private JCheckBox qOneOptOne;
	private JCheckBox qOneOptTwo;
	private JCheckBox qOneOptThree;
	private JComboBox<String> qThreeComboBox;
	private JMenuBar quizMenuBar;
	private JMenu quizFileMenu;
	private JMenuItem startMenuItem;
	private JMenuItem restartMenuItem;
	private JMenuItem closeMenuItem;
	private Image scaledTick = new ImageIcon("greencheck.png").getImage().getScaledInstance(50, 50, Image.SCALE_DEFAULT);
	private ImageIcon tickImage = new ImageIcon(scaledTick);
	private Image scaledArrow = new ImageIcon("leftarrow.png").getImage().getScaledInstance(100, 50,
				Image.SCALE_DEFAULT);
	private ImageIcon arrowImage = new ImageIcon(scaledArrow);
	private Image scaledX = new ImageIcon("redx.png").getImage().getScaledInstance(30, 30, Image.SCALE_DEFAULT);
	private ImageIcon xImage = new ImageIcon(scaledX);

	private int score = 0;
	private int currentQuestion = 0;

	// Creates a new instance of the SimpleQuiz constructor to initialize the JFrame
	// and begin the Quiz sequence.
	public static void main(String[] args)
	{
		new C10();
	}

	// Initializes and adds
	public C10()
	{
		simpleQuizFrame = new JFrame("Evan's Simple Quiz");
		simpleQuizFrame.setLayout(null);
		simpleQuizFrame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
		simpleQuizFrame.setSize(500, 400);
		simpleQuizFrame.getContentPane().setBackground(Color.WHITE);
		simpleQuizFrame.setLocationRelativeTo(null);
		simpleQuizFrame.setResizable(false);

		titleTextLabel = new JLabel();
		titleTextLabel.setSize(400, 50);
		titleTextLabel.setLocation(simpleQuizFrame.getWidth() / 2 - 185, simpleQuizFrame.getHeight() / 2 - 60);
		titleTextLabel.setFont(new Font("Arial", Font.BOLD, 24));
		titleTextLabel.setText("Welcome to Evan's Simple Quiz!");
		titleTextLabel.setBackground(Color.WHITE);
		titleTextLabel.setForeground(Color.RED);
		titleTextLabel.setVisible(true);

		qTextLabel = new JLabel();
		qTextLabel.setSize(400, 50);
		qTextLabel.setLocation(simpleQuizFrame.getWidth() / 2 - 190, simpleQuizFrame.getHeight() / 2 - 185);
		qTextLabel.setFont(new Font("Arial", Font.BOLD, 18));
		qTextLabel.setText("#1: Which of these are continents on Earth?");
		qTextLabel.setBackground(Color.WHITE);
		qTextLabel.setForeground(Color.RED);
		qTextLabel.setVisible(false);

		qOneOptOne = new JCheckBox("Australia");
		qOneOptOne.addActionListener(this);
		qOneOptOne.setFont(new Font("Arial", Font.BOLD, 18));
		qOneOptOne.setBackground(Color.WHITE);
		qOneOptOne.setBounds(simpleQuizFrame.getWidth() / 2 - 50, simpleQuizFrame.getHeight() / 2 - 125, 150, 35);
		qOneOptOne.setVisible(false);

		qOneOptTwo = new JCheckBox("America");
		qOneOptTwo.addActionListener(this);
		qOneOptTwo.setFont(new Font("Arial", Font.BOLD, 18));
		qOneOptTwo.setBackground(Color.WHITE);
		qOneOptTwo.setBounds(simpleQuizFrame.getWidth() / 2 - 50, simpleQuizFrame.getHeight() / 2 - 75, 150, 35);
		qOneOptTwo.setVisible(false);

		qOneOptThree = new JCheckBox("Europe");
		qOneOptThree.addActionListener(this);
		qOneOptThree.setFont(new Font("Arial", Font.BOLD, 18));
		qOneOptThree.setBackground(Color.WHITE);
		qOneOptThree.setBounds(simpleQuizFrame.getWidth() / 2 - 50, simpleQuizFrame.getHeight() / 2 - 25, 100, 35);
		qOneOptThree.setVisible(false);

		qTwoOptOne = new JRadioButton("146.79 million miles");
		qTwoOptOne.addActionListener(this);
		qTwoOptOne.setFont(new Font("Arial", Font.BOLD, 18));
		qTwoOptOne.setBackground(Color.WHITE);
		qTwoOptOne.setBounds(simpleQuizFrame.getWidth() / 2 - 100, simpleQuizFrame.getHeight() / 2 - 125, 250, 35);
		qTwoOptOne.setVisible(false);

		qTwoOptTwo = new JRadioButton("86.53 million miles");
		qTwoOptTwo.addActionListener(this);
		qTwoOptTwo.setFont(new Font("Arial", Font.BOLD, 18));
		qTwoOptTwo.setBackground(Color.WHITE);
		qTwoOptTwo.setBounds(simpleQuizFrame.getWidth() / 2 - 100, simpleQuizFrame.getHeight() / 2 - 75, 200, 35);
		qTwoOptTwo.setVisible(false);

		qTwoOptThree = new JRadioButton("92.96 million miles");
		qTwoOptThree.addActionListener(this);
		qTwoOptThree.setFont(new Font("Arial", Font.BOLD, 18));
		qTwoOptThree.setBackground(Color.WHITE);
		qTwoOptThree.setBounds(simpleQuizFrame.getWidth() / 2 - 100, simpleQuizFrame.getHeight() / 2 - 25, 200, 35);
		qTwoOptThree.setVisible(false);

		qTwoGroup = new ButtonGroup();
		qTwoGroup.add(qTwoOptOne);
		qTwoGroup.add(qTwoOptTwo);
		qTwoGroup.add(qTwoOptThree);

		String[] qThreeOptions = {"6.4 billion", "8.2 billion", "7.7 billion"};

		qThreeComboBox = new JComboBox<String>(qThreeOptions);
		qThreeComboBox.setSize(200, 50);
		qThreeComboBox.setLocation(simpleQuizFrame.getWidth() / 2 - 100, simpleQuizFrame.getHeight() / 2 - 85);
		qThreeComboBox.setSelectedItem(null);
		qThreeComboBox.setVisible(false);

		qThreeAnswerLabel = new JLabel();
		qThreeAnswerLabel.setSize(450, 50);
		qThreeAnswerLabel.setLocation(simpleQuizFrame.getWidth() / 2 - 200, simpleQuizFrame.getHeight() / 2 - 35);
		qThreeAnswerLabel.setFont(new Font("Arial", Font.BOLD, 24));
		qThreeAnswerLabel.setBackground(Color.WHITE);
		qThreeAnswerLabel.setVisible(false);

		submitAnswerButton = new JButton("Submit Answer");
		submitAnswerButton.setFont(new Font("Arial", Font.BOLD, 24));
		submitAnswerButton.setSize(220, 50);
		submitAnswerButton.setLocation(simpleQuizFrame.getWidth() / 2 - 110, simpleQuizFrame.getHeight() / 2 + 35);
		submitAnswerButton.setForeground(Color.BLACK);
		submitAnswerButton.setFocusable(false);
		submitAnswerButton.addActionListener(this);
		submitAnswerButton.setVisible(false);

		arrowLabel = new JLabel(arrowImage);
		arrowLabel.setSize(100, 100);
		arrowLabel.setVisible(false);

		arrowLabel2 = new JLabel(arrowImage);
		arrowLabel2.setSize(100, 100);
		arrowLabel2.setVisible(false);

		tickLabel = new JLabel(tickImage);
		tickLabel.setSize(50, 50);
		tickLabel.setVisible(false);

		tickLabel2 = new JLabel(tickImage);
		tickLabel2.setSize(50, 50);
		tickLabel2.setVisible(false);

		xLabel = new JLabel(xImage);
		xLabel.setSize(40, 40);
		xLabel.setVisible(false);

		nextQButton = new JButton("Next Question");
		nextQButton.setFont(new Font("Arial", Font.BOLD, 20));
		nextQButton.setSize(180, 35);
		nextQButton.setLocation(simpleQuizFrame.getWidth() / 2 - 90, simpleQuizFrame.getHeight() / 2 + 100);
		nextQButton.setForeground(Color.BLACK);
		nextQButton.setFocusable(false);
		nextQButton.addActionListener(this);
		nextQButton.setVisible(false);

		restartQuizButton = new JButton("Restart Quiz");
		restartQuizButton.setFont(new Font("Arial", Font.BOLD, 24));
		restartQuizButton.setSize(220, 50);
		restartQuizButton.setLocation(simpleQuizFrame.getWidth() / 2 - 110, simpleQuizFrame.getHeight() / 2 - 15);
		restartQuizButton.setForeground(Color.BLACK);
		restartQuizButton.setFocusable(false);
		restartQuizButton.addActionListener(this);
		restartQuizButton.setVisible(false);

		closeQuizButton = new JButton("Close Program");
		closeQuizButton.setFont(new Font("Arial", Font.BOLD, 24));
		closeQuizButton.setSize(220, 50);
		closeQuizButton.setLocation(simpleQuizFrame.getWidth() / 2 - 110, simpleQuizFrame.getHeight() / 2 + 45);
		closeQuizButton.setForeground(Color.BLACK);
		closeQuizButton.setFocusable(false);
		closeQuizButton.addActionListener(this);
		closeQuizButton.setVisible(false);

		showScoreLabel = new JLabel();
		showScoreLabel.setSize(400, 30);
		showScoreLabel.setLocation(simpleQuizFrame.getWidth() / 2 - 150, simpleQuizFrame.getHeight() / 2 - 100);
		showScoreLabel.setFont(new Font("Arial", Font.BOLD, 30));
		showScoreLabel.setBackground(Color.WHITE);
		showScoreLabel.setForeground(Color.RED);
		showScoreLabel.setVisible(false);

		quizMenuBar = new JMenuBar();
		quizFileMenu = new JMenu("File");

		startMenuItem = new JMenuItem("Start Quiz");
		startMenuItem.addActionListener(this);

		restartMenuItem = new JMenuItem("Restart Quiz");
		restartMenuItem.addActionListener(this);

		closeMenuItem = new JMenuItem("Close Program");
		closeMenuItem.addActionListener(this);

		quizMenuBar.add(quizFileMenu);
		quizFileMenu.add(startMenuItem);
		quizFileMenu.add(restartMenuItem);
		quizFileMenu.add(closeMenuItem);

		simpleQuizFrame.add(qOneOptOne);
		simpleQuizFrame.add(qOneOptTwo);
		simpleQuizFrame.add(qOneOptThree);

		simpleQuizFrame.add(qTwoOptOne);
		simpleQuizFrame.add(qTwoOptTwo);
		simpleQuizFrame.add(qTwoOptThree);

		simpleQuizFrame.add(qThreeComboBox);
		simpleQuizFrame.add(qThreeAnswerLabel);

		simpleQuizFrame.add(titleTextLabel);
		simpleQuizFrame.add(qTextLabel);

		simpleQuizFrame.add(arrowLabel);
		simpleQuizFrame.add(arrowLabel2);
		simpleQuizFrame.add(tickLabel);
		simpleQuizFrame.add(tickLabel2);
		simpleQuizFrame.add(xLabel);

		simpleQuizFrame.add(submitAnswerButton);
		simpleQuizFrame.add(restartQuizButton);
		simpleQuizFrame.add(closeQuizButton);
		simpleQuizFrame.add(nextQButton);
		simpleQuizFrame.add(showScoreLabel);

		simpleQuizFrame.setJMenuBar(quizMenuBar);
		simpleQuizFrame.setVisible(true);
	}

	public void startQuiz()
	{
		showQOne();
		startMenuItem.setEnabled(false);
		titleTextLabel.setVisible(false);
		submitAnswerButton.setVisible(true);
	}

	public void restartQuiz()
	{
		simpleQuizFrame.dispose();
		new C10();
	}

	public void showQOne()
	{
		currentQuestion = 1;
		qTextLabel.setVisible(true);
		qTextLabel.setSize(400, 50);
		qTextLabel.setLocation(simpleQuizFrame.getWidth() / 2 - 190, simpleQuizFrame.getHeight() / 2 - 185);
		qTextLabel.setText("#1: Which of these are continents on Earth?");
		qOneOptOne.setVisible(true);
		qOneOptTwo.setVisible(true);
		qOneOptThree.setVisible(true);
	}

	public void hideQOne()
	{
		qOneOptOne.setVisible(false);
		qOneOptTwo.setVisible(false);
		qOneOptThree.setVisible(false);
		simpleQuizFrame.remove(tickLabel2);
		arrowLabel.setVisible(false);
		arrowLabel2.setVisible(false);
		tickLabel.setVisible(false);
		tickLabel2.setVisible(false);
		xLabel.setVisible(false);
		nextQButton.setVisible(false);
	}

	public void showQTwo()
	{
		currentQuestion = 2;
		qTextLabel.setVisible(true);
		qTextLabel.setSize(450, 50);
		qTextLabel.setLocation(simpleQuizFrame.getWidth() / 2 - 225, simpleQuizFrame.getHeight() / 2 - 185);
		qTextLabel.setText("#2: How far is the Earth away from the sun (miles)?");
		qTwoOptOne.setVisible(true);
		qTwoOptTwo.setVisible(true);
		qTwoOptThree.setVisible(true);
		submitAnswerButton.setEnabled(true);
	}

	public void hideQTwo()
	{
		qTwoOptOne.setVisible(false);
		qTwoOptTwo.setVisible(false);
		qTwoOptThree.setVisible(false);
		arrowLabel.setVisible(false);
		tickLabel.setVisible(false);
		xLabel.setVisible(false);
		nextQButton.setVisible(false);
	}

	public void showQThree()
	{
		currentQuestion = 3;
		qTextLabel.setVisible(true);
		qTextLabel.setSize(350, 50);
		qTextLabel.setLocation(simpleQuizFrame.getWidth() / 2 - 175, simpleQuizFrame.getHeight() / 2 - 185);
		qTextLabel.setText("#3: What is the population of the Earth?");
		qThreeComboBox.setVisible(true);
		submitAnswerButton.setEnabled(true);
	}

	public void hideQThree()
	{
		qTextLabel.setVisible(false);
		qThreeComboBox.setVisible(false);
		qThreeAnswerLabel.setVisible(false);
		xLabel.setVisible(false);
		tickLabel.setVisible(false);
		submitAnswerButton.setVisible(false);
		nextQButton.setVisible(false);
	}

	public void displayScore(int score)
	{
		double scorePercentage = 0;
		double tempPercent = 0;
		
		tempPercent = ((double)score / 3) * 1000;
		scorePercentage = ((double)Math.round(tempPercent)) / 10;
		System.out.println(scorePercentage);
		
		showScoreLabel.setText("Score: " + score + "/3" + " : " + scorePercentage + "%");
		
		if (score == 3)
			showScoreLabel.setForeground(Color.GREEN);
		
		showScoreLabel.setVisible(true);
		restartQuizButton.setVisible(true);
		closeQuizButton.setVisible(true);
	}

	@Override
	public void actionPerformed(ActionEvent e)
	{
		if (e.getActionCommand().equals("Start Quiz"))
		{
			if (showScoreLabel.isVisible() == false)
				startQuiz();
		}

		if (e.getActionCommand().equals("Restart Quiz"))
		{
			restartQuiz();
		}

		if (e.getActionCommand().equals("Close Program"))
		{
			System.exit(0);
		}

		if (e.getActionCommand().equals("Submit Answer"))
		{

			if (currentQuestion == 1)
			{

				if (qOneOptOne.isSelected() && qOneOptTwo.isSelected() == false && qOneOptThree.isSelected() == false)
				{
					score += 0;
					arrowLabel.setLocation(simpleQuizFrame.getWidth() / 2 + 100, simpleQuizFrame.getHeight() / 2 - 55);
					tickLabel.setLocation(simpleQuizFrame.getWidth() / 2 + 90, simpleQuizFrame.getHeight() / 2 - 145);
					qOneOptOne.setForeground(Color.GREEN);
					qOneOptTwo.setForeground(Color.RED);
					qOneOptTwo.setEnabled(false);
					qOneOptThree.setEnabled(false);
					arrowLabel.setVisible(true);
					tickLabel.setVisible(true);
					nextQButton.setVisible(true);
				}

				if (qOneOptOne.isSelected() && qOneOptTwo.isSelected() && qOneOptThree.isSelected() == false)
				{
					score += 0;
					tickLabel.setLocation(simpleQuizFrame.getWidth() / 2 + 90, simpleQuizFrame.getHeight() / 2 - 145);
					xLabel.setLocation(simpleQuizFrame.getWidth() / 2 + 95, simpleQuizFrame.getHeight() / 2 - 75);
					arrowLabel2.setLocation(simpleQuizFrame.getWidth() / 2 + 100, simpleQuizFrame.getHeight() / 2 - 55);
					qOneOptOne.setForeground(Color.GREEN);
					qOneOptTwo.setForeground(Color.RED);
					qOneOptThree.setEnabled(false);
					tickLabel.setVisible(true);
					xLabel.setVisible(true);
					arrowLabel2.setVisible(true);
					nextQButton.setVisible(true);

				}

				if (qOneOptOne.isSelected() == false && qOneOptTwo.isSelected() && qOneOptThree.isSelected() == false)
				{
					score += 0;
					arrowLabel2.setLocation(simpleQuizFrame.getWidth() / 2 + 100, simpleQuizFrame.getHeight() / 2 - 155);
					arrowLabel.setLocation(simpleQuizFrame.getWidth() / 2 + 100, simpleQuizFrame.getHeight() / 2 - 55);
					xLabel.setLocation(simpleQuizFrame.getWidth() / 2 + 95, simpleQuizFrame.getHeight() / 2 - 75);
					qOneOptTwo.setForeground(Color.RED);
					qOneOptOne.setEnabled(false);
					qOneOptThree.setEnabled(false);
					arrowLabel.setVisible(true);
					arrowLabel2.setVisible(true);
					xLabel.setVisible(true);
					submitAnswerButton.setEnabled(false);
					nextQButton.setVisible(true);
				}

				if (qOneOptOne.isSelected() == false && qOneOptTwo.isSelected() && qOneOptThree.isSelected())
				{
					score += 0;
					arrowLabel.setLocation(simpleQuizFrame.getWidth() / 2 + 100, simpleQuizFrame.getHeight() / 2 - 155);
					tickLabel.setLocation(simpleQuizFrame.getWidth() / 2 + 95, simpleQuizFrame.getHeight() / 2 - 45);
					xLabel.setLocation(simpleQuizFrame.getWidth() / 2 + 95, simpleQuizFrame.getHeight() / 2 - 75);
					qOneOptTwo.setForeground(Color.RED);
					qOneOptThree.setForeground(Color.GREEN);
					qOneOptOne.setEnabled(false);
					arrowLabel.setVisible(true);
					tickLabel.setVisible(true);
					xLabel.setVisible(true);
					submitAnswerButton.setEnabled(false);
					nextQButton.setVisible(true);
				}

				if (qOneOptOne.isSelected() == false && qOneOptTwo.isSelected() == false && qOneOptThree.isSelected())
				{
					score += 0;
					tickLabel.setLocation(simpleQuizFrame.getWidth() / 2 + 90, simpleQuizFrame.getHeight() / 2 - 45);
					arrowLabel2.setLocation(simpleQuizFrame.getWidth() / 2 + 100, simpleQuizFrame.getHeight() / 2 - 155);
					qOneOptThree.setForeground(Color.GREEN);
					qOneOptOne.setEnabled(false);
					qOneOptTwo.setEnabled(false);
					tickLabel.setVisible(true);
					arrowLabel2.setVisible(true);
					submitAnswerButton.setEnabled(false);
					nextQButton.setVisible(true);
				}

				if (qOneOptOne.isSelected() && qOneOptTwo.isSelected() == false && qOneOptThree.isSelected())
				{
					score += 1;
					tickLabel.setLocation(simpleQuizFrame.getWidth() / 2 + 90, simpleQuizFrame.getHeight() / 2 - 145);
					tickLabel2.setLocation(simpleQuizFrame.getWidth() / 2 + 90, simpleQuizFrame.getHeight() / 2 - 45);
					qOneOptOne.setForeground(Color.GREEN);
					qOneOptThree.setForeground(Color.GREEN);
					qOneOptTwo.setEnabled(false);
					tickLabel.setVisible(true);
					tickLabel2.setVisible(true);
					submitAnswerButton.setEnabled(false);
					nextQButton.setVisible(true);

				}

				if (qOneOptOne.isSelected() && qOneOptTwo.isSelected() && qOneOptThree.isSelected())
				{
					score += 0;
					tickLabel.setLocation(simpleQuizFrame.getWidth() / 2 + 100, simpleQuizFrame.getHeight() / 2 - 45);
					tickLabel2.setLocation(simpleQuizFrame.getWidth() / 2 + 100, simpleQuizFrame.getHeight() / 2 - 145);
					xLabel.setLocation(simpleQuizFrame.getWidth() / 2 + 100, simpleQuizFrame.getHeight() / 2 - 80);
					qOneOptOne.setForeground(Color.GREEN);
					qOneOptTwo.setForeground(Color.RED);
					qOneOptThree.setForeground(Color.GREEN);
					xLabel.setVisible(true);
					tickLabel.setVisible(true);
					tickLabel2.setVisible(true);
					submitAnswerButton.setEnabled(false);
					nextQButton.setVisible(true);
				}
			}

			if (currentQuestion == 2)
			{
				if (qTwoOptOne.isSelected())
				{
					score += 0;
					arrowLabel.setLocation(simpleQuizFrame.getWidth() / 2 + 100, simpleQuizFrame.getHeight() / 2 - 55);
					xLabel.setLocation(simpleQuizFrame.getWidth() / 2 + 100, simpleQuizFrame.getHeight() / 2 - 130);
					qTwoOptOne.setForeground(Color.RED);
					qTwoOptThree.setForeground(Color.GREEN);
					qTwoOptTwo.setEnabled(false);
					qTwoOptThree.setEnabled(false);
					xLabel.setVisible(true);
					arrowLabel.setVisible(true);
					submitAnswerButton.setEnabled(false);
					nextQButton.setVisible(true);
				}
				if (qTwoOptTwo.isSelected())
				{
					score += 0;
					arrowLabel.setLocation(simpleQuizFrame.getWidth() / 2 + 100, simpleQuizFrame.getHeight() / 2 - 55);
					xLabel.setLocation(simpleQuizFrame.getWidth() / 2 + 90, simpleQuizFrame.getHeight() / 2 - 80);
					qTwoOptTwo.setForeground(Color.RED);
					qTwoOptThree.setForeground(Color.GREEN);
					qTwoOptOne.setEnabled(false);
					qTwoOptThree.setEnabled(false);
					xLabel.setVisible(true);
					arrowLabel.setVisible(true);
					submitAnswerButton.setEnabled(false);
					nextQButton.setVisible(true);
				}
				if (qTwoOptThree.isSelected())
				{
					score += 1;
					tickLabel.setLocation(simpleQuizFrame.getWidth() / 2 + 90, simpleQuizFrame.getHeight() / 2 - 45);
					qTwoOptThree.setForeground(Color.GREEN);
					qTwoOptOne.setEnabled(false);
					qTwoOptTwo.setEnabled(false);
					tickLabel.setVisible(true);
					submitAnswerButton.setEnabled(false);
					nextQButton.setVisible(true);
				}
			}

			if (currentQuestion == 3)
			{
				nextQButton.setText("Display Score");

				if (qThreeComboBox.getSelectedItem() == null)
				{
					return;
				}

				String selectedAnswer = (String) qThreeComboBox.getItemAt(qThreeComboBox.getSelectedIndex());

				if (selectedAnswer.equals("6.4 billion"))
				{
					score += 0;
					qThreeAnswerLabel.setForeground(Color.RED);
					qThreeAnswerLabel.setText("Incorrect, correct answer: 7.7 billion");
					xLabel.setLocation(simpleQuizFrame.getWidth() / 2 + 110, simpleQuizFrame.getHeight() / 2 - 80);
					xLabel.setVisible(true);
					qThreeAnswerLabel.setVisible(true);
					qThreeComboBox.setEnabled(false);
					submitAnswerButton.setEnabled(false);
					nextQButton.setVisible(true);
				}

				if (selectedAnswer.equals("8.2 billion"))
				{
					score += 0;
					qThreeAnswerLabel.setForeground(Color.RED);
					qThreeAnswerLabel.setText("Incorrect, correct answer: 7.7 billion");
					xLabel.setLocation(simpleQuizFrame.getWidth() / 2 + 110, simpleQuizFrame.getHeight() / 2 - 80);
					xLabel.setVisible(true);
					qThreeAnswerLabel.setVisible(true);
					qThreeComboBox.setEnabled(false);
					submitAnswerButton.setEnabled(false);
					nextQButton.setVisible(true);
				}

				if (selectedAnswer.equals("7.7 billion"))
				{
					score += 1;
					qThreeAnswerLabel.setForeground(Color.GREEN);
					qThreeAnswerLabel.setText("Correct answer!");
					qThreeAnswerLabel.setLocation(simpleQuizFrame.getWidth() / 2 - 90, simpleQuizFrame.getHeight() / 2 - 30);
					tickLabel.setLocation(simpleQuizFrame.getWidth() / 2 + 105, simpleQuizFrame.getHeight() / 2 - 95);
					tickLabel.setVisible(true);
					qThreeAnswerLabel.setVisible(true);
					qThreeComboBox.setEnabled(false);
					submitAnswerButton.setEnabled(false);
					nextQButton.setVisible(true);
				}
			}
		}

		if (e.getActionCommand().equals("Next Question"))
		{

			System.out.println(score);
			if (currentQuestion == 1)
			{
				hideQOne();
				showQTwo();
				return;
			}

			if (currentQuestion == 2)
			{
				hideQTwo();
				showQThree();
				return;
			}
		}

		if (e.getActionCommand().equals("Display Score"))
		{
			hideQThree();
			displayScore(score);
			return;
		}
	}
}
