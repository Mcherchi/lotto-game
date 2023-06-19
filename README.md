# lotto-game

This project is a simulation of the popular Lotto game implemented in Node.js.

The game follows the official rules of Lotto, which can be found [here](https://www.sisal.it/lotto/come-si-gioca).

Tables with multipliers for calculating winnings can be found [here](https://www.lotto-italia.it/lotto/come-dove-giocare/il-gioco/premi-del-lotto).

## Installation

1. First, ensure that you have Node.js installed on your system. To check if it is already installed, run the following command in your terminal:

```bash
node -v
```

If Node.js is installed, you will see the version number displayed (e.g., v18.16.0). If not, you can download it from the official [Node.js website](https://nodejs.org).

2. Download the project folder by clicking on the green "Code" button and selecting "Download ZIP". Extract the downloaded ZIP file, or alternatively, clone the repository using the following command in your terminal:

```bash
git clone https://github.com/Mcherchi/lotto-game.git
```

3. Open the extracted project folder or the cloned repository in your preferred IDE.

4. Open your terminal and navigate to the project directory.

5. Install the project dependencies by running the following command in the terminal:

```bash
npm install
```

6. To start a new game, run the following command in the terminal:

```bash
npm start
```

## Gameplay

### 1. Number of Tickets

Select the number of tickets to play, ranging from 1 to 5.

```
Welcome to the Lotto Game!!

How many tickets do you want to generate? (min: 1 - max: 5)
Enter you choice:

```

### 2. Ticket Numbers

Enter the numbers for each ticket. The numbers will be randomly generated between 1 and 90, and each ticket must contain 10 unique numbers.

```
How many numbers do you want to generate? (min: 1 - max: 10)

Enter you choice:

```

### 3. Type of bet

Select the type of bet from the following options: "Estratto", "Ambo", "Terno", "Quaterna", "Cinquina". The type of bet is determined by the amount of numbers played.

```
Choose a type:
1) Estratto
2) Ambo
3) Terno
4) Quaterna
5) Cinquina
Enter you choice:

```

### 4. Amount of money

Enter the amount of money to bet on the selected type of bet. The amount must be between 1 and 200.

```
Indicates the amount of bet (min: €1 - max €200)

Enter you choice:

```

### 5. Cities Selection

Select the cities on which you want to place your bets. You can choose to bet on all available cities.

```
Choose a city:
1) Bari
2) Cagliari
3) Firenze
4) Genova
5) Milano
6) Napoli
7) Palermo
8) Roma
9) Torino
10) Venezia
11) Tutte
Enter you choice:

```

### 6. Ticket Generation

The game generates the specified number of tickets, each containing randomly generated numbers, selected cities, and the chosen bet amount.

```
+---------------------------------------------------------+
|                        Ticket #1                        |
+---------+-----------------------------------------------+
| Type    | Estratto                                      |
| City    | Tutte                                         |
| Numbers | 1 - 7 - 11 - 22 - 25 - 37 - 46 - 53 - 87 - 88 |
| Bet     | €25                                           |
+---------+-----------------------------------------------+




+----------------------------------------------------------+
|                        Ticket #2                         |
+---------+------------------------------------------------+
| Type    | Ambo                                           |
| City    | Bari - Cagliari - Firenze                      |
| Numbers | 5 - 23 - 27 - 49 - 57 - 61 - 66 - 76 - 85 - 86 |
| Bet     | €25                                            |
+---------+------------------------------------------------+


```

### 7. Extraction

The game generates a random extraction of 5 numbers between 1 and 90.

```
+-----------------------------------+
|     Extraction #1 - 19/6/2023     |
+----------+------------------------+
|   City   |        Numbers         |
+----------+------------------------+
| Bari     | 6 - 44 - 45 - 50 - 82  |
| Cagliari | 5 - 24 - 29 - 37 - 69  |
| Firenze  | 26 - 28 - 53 - 59 - 80 |
| Genova   | 26 - 27 - 28 - 46 - 62 |
| Milano   | 2 - 17 - 46 - 56 - 80  |
| Napoli   | 1 - 17 - 37 - 63 - 82  |
| Palermo  | 2 - 15 - 45 - 56 - 75  |
| Roma     | 1 - 35 - 49 - 55 - 75  |
| Torino   | 13 - 19 - 22 - 52 - 66 |
| Venezia  | 21 - 22 - 52 - 53 - 66 |
+----------+------------------------+

```

### 8. Winnings

The game calculates the winnings for each ticket based on the type of bet, the amount of money and the number of matching numbers. Finally, it prints the details of the win

```
You played 2 tickets, details on winnings are below


+--------------------------+
|    Ticket #1: Winning    |
+---------------+----------+
| Cagliari      |       37 |
| Firenze       |       53 |
| Genova        |       46 |
| Milano        |       46 |
| Napoli        | 1 - 37   |
| Roma          |        1 |
| Torino        |       22 |
| Venezia       | 22 - 53  |
| Type          | Estratto |
| gross Winning | € 2.81   |
| net Winning   | € 2.59   |
+---------------+----------+


Ticket #2 Not winning

```
