// src/bankHolidays.ts

export interface Holiday {
  date: string;
  name: string;
  description: string;
}

const BankHolidays: Holiday[] = [
  {
    date: "2023-01-01",
    name: "New Year's Day",
    description: "Celebrating the beginning of the year.",
  },
  // Add more holiday objects for the entire year...
];

export default BankHolidays;
