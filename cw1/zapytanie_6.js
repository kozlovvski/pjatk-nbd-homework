const newPerson = {
  sex: 'Male',
  first_name: 'Michal',
  last_name: 'Kozlowski',
  job: 'Frontend Developer',
  email: 'michal@kozlovv.ski',
  location: {
    city: 'Warsaw',
    address: {
      streetname: 'Puławska',
      streetnumber: '5',
    },
  },
  description: 'lorem ipsum',
  height: '191.00',
  weight: '92.00',
  birth_date: '1998-02-24T00:00:00Z',
  nationality: 'Poland',
  credit: [
    {
      type: 'switch',
      number: '6759888939100098123',
      currency: 'PLN',
      balance: '999999.99',
    },
  ],
};

printjson(db.people.insert(newPerson));
