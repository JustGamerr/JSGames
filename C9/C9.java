/*
 March 15th, 2019
 Classwork #9
*/

import java.awt.Color;
import java.awt.Dimension;
import java.awt.Graphics;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Scanner;

import javax.swing.*;

public class C9
{
	static ArrayList<Integer> inputList = new ArrayList<Integer>();
	static Map<Integer, Integer> frequenciesMap = new LinkedHashMap<>();
	private static final int GRAPH_BAR_WIDTH = 60;
	private static final int BAR_DISTANCE = 20;

	//
	public static void main(String[] args)
	{
		Scanner input = new Scanner(System.in);
		String userInput = "";
		int currentListIndex = 0;

		do
		{
			userInput = getInput(input);
			try
			{
				if (!userInput.equals(""))
				{
					inputList.add(Integer.parseInt(userInput));
					currentListIndex++;
				}
			}
			catch (Exception e)
			{
				System.out.println("Invalid input type, any type other than an integer is not allowed.");
			}
		} while ((!userInput.equals("") || currentListIndex == 0 || currentListIndex == 1));

		calculateArithmeticMean();
		calculateGeometricMean();
		calculateHarmonicMean();
		calculateMedian();
		calculateRange();
		calculateMode();
		calculateStandardDeviation();
		displayConsoleGraph();
		displayFrameGraph();
	}

	// Prompts for, and then gets the input of each line
	// entered by the user to then be sent back to the main function.
	public static String getInput(Scanner input)
	{
		System.out.print("Please enter at least two separate integers: ");
		String userInput = input.nextLine();

		return userInput;
	}

	// Calculates the arithmetic mean of the numbers inputed. The arithmetic mean
	// is calculated by adding up all of the numbers, divided by the amount of numbers.
	public static void calculateArithmeticMean()
	{
		double arithMeanTotal = 0;

		for (int i = 0; i < inputList.size(); i++)
			arithMeanTotal += inputList.get(i);

		arithMeanTotal = arithMeanTotal / inputList.size();
		System.out.printf("\nThe arithmetic mean of all the inputted integers is: " + "%.2f%1s", arithMeanTotal, ".");
	}

	// Calculates the geometric mean of the numbers inputed. The geometric mean
	// is calculated by multiplying the numbers together, then getting the nth root
	// where n is the number of values multiplied together.
	public static void calculateGeometricMean()
	{
		double geoMeanTotal = 1;

		for (int i = 0; i < inputList.size(); i++)
			geoMeanTotal *= inputList.get(i);

		geoMeanTotal = (float) Math.pow(geoMeanTotal, (float) 1 / inputList.size());

		System.out.printf("\nThe geometric mean of all the inputted integers is: " + "%.2f%1s", geoMeanTotal, ".");
	}

	// Calculates the harmonic mean of the numbers inputed. The harmonic mean
	// is calculated by adding the reciprocals of all the numbers in the list, then
	// dividing the sum by the amount of numbers, and taking the reciprocal of the result.
	public static void calculateHarmonicMean()
	{
		double harmoRecipsTotal = 0;
		double harmoFinalTotal = 0;

		for (int i = 0; i < inputList.size(); i++)
			harmoRecipsTotal += ((double) 1 / inputList.get(i));

		harmoFinalTotal = (inputList.size() / harmoRecipsTotal);

		System.out.printf("\nThe harmonic mean of all the inputted integers is: " + "%.2f%1s", harmoFinalTotal, ".");
	}

	// Calculates the median of the numbers inputed. The median is calculated
	// by finding the middle number of the sorted set of numbers, if the amount
	// is even, then the two medians are added together and divided by 2.
	public static void calculateMedian()
	{
		ArrayList<Integer> medianList = new ArrayList<Integer>(inputList);
		Collections.sort(medianList);

		int listMedian = medianList.size() / 2;

		float processedMedian = 0;

		if (medianList.size() % 2 == 0)
		{
			processedMedian = medianList.get(listMedian - 1);
			int processedEvenMedian = medianList.get(listMedian);
			float totalMedian = (processedMedian + processedEvenMedian) / 2;
			System.out.printf("\n\nThe median of all the inputted integers is: " + "%.2f%1s", totalMedian, ".");
		}
		else
		{
			processedMedian = medianList.get(listMedian);
			System.out.printf("\n\nThe median of all the inputted integers is: " + "%.2f%1s", processedMedian, ".");
		}
	}

	// Calculates the range of the numbers inputed. The range is calculated
	// by subtracting the largest number from the smallest number in the list.
	public static void calculateRange()
	{
		int listRange = 0;

		int listMaximum = inputList.get(0);
		int listMinimum = inputList.get(0);

		for (int current : inputList)
		{
			if (current > listMaximum)
				listMaximum = current;
			else if (current < listMinimum)
				listMinimum = current;
		}

		listRange = listMaximum - listMinimum;
		System.out.println("\n\nThe range of all the inputted integers is: " + listRange + ".");
	}

	// Calculates the mode of the numbers inputed. The mode is calculated
	// by finding the most common/most used number in the provided list/set.
	public static void calculateMode()
	{
		// Creates a copy of inputlist and sorts it numerically.
		ArrayList<Integer> modeList = new ArrayList<Integer>(inputList);
		Collections.sort(modeList);

		// Creates a list and map for the located modes and a map of the modes located.
		List<Integer> modesFoundList = new ArrayList<Integer>();
		Map<Integer, Integer> modeMap = new HashMap<Integer, Integer>();

		// Set the mode maximum value to -1.
		int max = -1;

		// Loop through each of the items in the cloned input list to detect as a mode.
		for (int i : modeList)
		{
			int count = 0;

			if (modeMap.containsKey(i))
				count = modeMap.get(i) + 1;
			else
				count = 1;

			modeMap.put(i, count);

			if (count > max)
				max = count;
		}

		// Loops through each entry from the count map.
		for (Map.Entry<Integer, Integer> modeEntry : modeMap.entrySet())
			if (modeEntry.getValue() == max)
				modesFoundList.add(modeEntry.getKey());

		// Converts the mode list to a string, then removes the [].
		String modesDisplay = modesFoundList.toString();
		modesDisplay = modesDisplay.replace("[", "");
		modesDisplay = modesDisplay.replace("]", "");
		modesDisplay = modesDisplay.replace("  ", "");

		// Determines whether to display "mode" or "modes" depending on the number of modes.
		if (modesDisplay.length() > 1)
			System.out.println("\nThe modes of all the inputted integers is: " + modesDisplay + ".");
		else
			System.out.println("\nThe mode of all the inputted integers is: " + modesDisplay + ".");

	}

	public static void calculateStandardDeviation()
	{
		double meanTotal = 0;
		double dataPoint = 0;
		double distanceToMean = 0;
		double sDeviationTotal = 0;

		// Get all values for the mean.
		for (int i = 0; i < inputList.size(); i++)
			meanTotal += inputList.get(i);

		meanTotal = meanTotal / inputList.size();

		for (int i = 0; i < inputList.size(); i++)
		{
			// Get the distance to mean, number - mean.
			distanceToMean = inputList.get(i) - meanTotal;
			// Set the data point to the distance squared.
			dataPoint = Math.pow(distanceToMean, 2);
			// Add that data point to the total.
			sDeviationTotal += dataPoint;
		}

		// Divide the total by the number of values - 1.
		sDeviationTotal /= (inputList.size() - 1);
		// Get the square root of the total.
		sDeviationTotal = Math.sqrt(sDeviationTotal);

		// Display the total for the standard deviation.
		System.out.printf("\nThe standard deviation of all the inputted integers is: " + "%.2f%1s", sDeviationTotal, ".");
	}

	public static void displayConsoleGraph()
	{
		ArrayList<Integer> consoleGraphList = new ArrayList<Integer>(inputList);
		Collections.sort(consoleGraphList);
		String consoleGraph = "\nInteger\t\tFrequency (number of times) integer appears in Array List";

		for (int counter = 0; counter < consoleGraphList.size();)
		{
			consoleGraph += "\n" + consoleGraphList.get(counter) + "\t|\t";
			Integer pos = consoleGraphList.get(counter);
			int frequency = 0;

			do
			{
				consoleGraph += "#";
				frequency++;
				if (frequency == Collections.frequency(consoleGraphList, pos))
				{
					while (consoleGraphList.contains(pos))
						consoleGraphList.remove(pos);
				}
			} while (frequency < Collections.frequency(consoleGraphList, pos));
		}
		System.out.println("\n\nConsole printed column graph:" + consoleGraph);
	}

	public static void displayFrameGraph()
	{
		ArrayList<Integer> frameGraphList = new ArrayList<Integer>(inputList);
		Collections.sort(frameGraphList);

		for (int counter = 0; counter < frameGraphList.size();)
		{
			Integer pos = frameGraphList.get(counter);
			int frequency = 0;

			do
			{
				frequency++;
				if (frequency == Collections.frequency(frameGraphList, pos))
				{
					frequenciesMap.put(pos, frequency);
					while (frameGraphList.contains(pos))
						frameGraphList.remove(pos);
				}
			} while (frequency < Collections.frequency(frameGraphList, pos));
		}

		System.out.println("\nJFrame Bar Graph opened.");
		new MeanMedianRange();
	}

	public C9()
	{
		Map<Integer, Integer> frequencies = new LinkedHashMap<>(frequenciesMap);

		int width = frequencies.size() * GRAPH_BAR_WIDTH + 100;
		int freqMax = getMax(frequencies);
		int graphHeight = freqMax * BAR_DISTANCE + 100;
		int horizon = graphHeight - 25;

		GraphPanel panel = new GraphPanel(frequencies, horizon, width, graphHeight);

		JFrame graphFrame = new JFrame("Bar Graph");
		graphFrame.add(panel);
		graphFrame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
		graphFrame.pack();
		graphFrame.setLocationRelativeTo(null);
		graphFrame.getContentPane().setBackground(Color.WHITE);
		graphFrame.setLocationRelativeTo(null);
		graphFrame.setResizable(false);
		graphFrame.setAlwaysOnTop(true);
		graphFrame.setVisible(true);
		graphFrame.setAlwaysOnTop(false);
	}

	private static int getMax(Map<Integer, Integer> frequencies)
	{
		int maxFreq = 0;
		for (Integer curFreq : frequencies.values())
		{
			if (curFreq > maxFreq)
			{
				maxFreq = curFreq;
			}
		}
		return maxFreq;
	}

	public class GraphPanel extends JPanel
	{
		Map<Integer, Integer> frequencies;
		int horizon;
		int graphWidth;
		int graphHeight;

		public GraphPanel(Map<Integer, Integer> frequencies, int horizon, int graphWidth, int graphHeight)
		{
			this.frequencies = frequencies;
			this.horizon = horizon;
			this.graphWidth = graphWidth;
			this.graphHeight = graphHeight;
		}

		@Override
		protected void paintComponent(Graphics g)
		{
			int x = 50;

			super.paintComponent(g);
			g.drawString("Bar Graph", (graphWidth / 2) - 35, 30);

			for (Map.Entry<Integer, Integer> entry : frequencies.entrySet())
			{
				int graphHeight = entry.getValue() * BAR_DISTANCE;
				int y = horizon - graphHeight - 15;

				g.setColor(Color.BLACK);
				if (entry.getValue() < 10)
					g.drawString("Freq: " + entry.getValue(), x + 7, y - 3);
				else
					g.drawString("Freq: " + entry.getValue(), x + 3, y - 3);
				g.drawString(entry.getKey() + "", x + (GRAPH_BAR_WIDTH / 2) - 8, horizon);
				g.setColor(Color.BLUE);
				g.fillRect(x, y, GRAPH_BAR_WIDTH - 10, graphHeight);
				x += GRAPH_BAR_WIDTH;
			}
		}

		@Override
		public Dimension getPreferredSize()
		{
			return new Dimension(graphWidth, graphHeight);
		}
	}
}
