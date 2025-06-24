function counterAdd(value: number): number {
  return value + 1;
}

function dateAdd(date: Date): Date {
  const newDate = new Date(date); // Cria uma nova instância para não modificar o original
  newDate.setSeconds(newDate.getSeconds() + 5); // Adiciona 5 segundos
  return newDate;
}

const baseData = [
  {
    id: 1,
    PressTireFR: counterAdd(1),
    PressTireFL: counterAdd(2),
    PressTireBR: counterAdd(2),
    PressTireBL: counterAdd(3),
    TempTireFR: counterAdd(2),
    TempTireFL: counterAdd(1),
    TempTireBR: counterAdd(1),
    TempTireBL: counterAdd(4),
    created_at: dateAdd(new Date()),
  },
];

function generateData(
  base: (typeof baseData)[0],
  count: number
): typeof baseData {
  const data = [];
  for (let i = 0; i < count; i++) {
    const newEntry = {
      ...base,
      id: base.id + i, // Incrementa o ID
      PressTireFR: counterAdd(base.PressTireFR + i),
      PressTireFL: counterAdd(base.PressTireFL + i),
      PressTireBR: counterAdd(base.PressTireBR + i),
      PressTireBL: counterAdd(base.PressTireBL + i),
      TempTireFR: counterAdd(base.TempTireFR + i),
      TempTireFL: counterAdd(base.TempTireFL + i),
      TempTireBR: counterAdd(base.TempTireBR + i),
      TempTireBL: counterAdd(base.TempTireBL + i),
      created_at: dateAdd(new Date(base.created_at.getTime() + i * 5000)), // Incrementa a data em 5 segundos por item
    };
    data.push(newEntry);
  }
  return data;
}

const baseItem = {
  id: 1,
  PressTireFR: 1,
  PressTireFL: 2,
  PressTireBR: 2,
  PressTireBL: 3,
  TempTireFR: 2,
  TempTireFL: 1,
  TempTireBR: 1,
  TempTireBL: 4,
  created_at: new Date(),
};

export const generatedData = generateData(baseItem, 40);

const baseData2 = [
  {
    id: 1,
    Velocity: 12,
    Temperature: 12,
    Fuel: 12,
    Rpm: 12,
    created_at: new Date(),
  },
];

function generateData2(
  base: (typeof baseData2)[0],
  count: number
): typeof baseData2 {
  const data = [];
  for (let i = 0; i < count; i++) {
    const newEntry = {
      ...base,
      id: base.id + i, // Incrementa o ID
      Velocity: counterAdd(base.Velocity + i),
      Temperature: counterAdd(base.Temperature + i),
      Fuel: counterAdd(base.Fuel + i),
      Rpm: counterAdd(base.Rpm + i),
      created_at: dateAdd(new Date(base.created_at.getTime() + i * 5000)), // Incrementa a data em 5 segundos por item
    };
    data.push(newEntry);
  }
  return data;
}

const baseItem2 = {
  id: 1,
  Velocity: 12,
  Temperature: 12,
  Fuel: 12,
  Rpm: 12,
  created_at: new Date(),
};

export const generatedData2 = generateData2(baseItem2, 40);
