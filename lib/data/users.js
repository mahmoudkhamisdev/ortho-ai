export const DEMO_USERS = [
  {
    id: 1,
    name: "Ahmed Hassan",
    email: "ahmed.hassan@orthoai.com",
    phone: "+201012345678",
    role: "admin",
    image: null,
    created_at: "2024-01-15T10:00:00Z",
    status: "active",
  },
  {
    id: 2,
    name: "Sara Mohamed",
    email: "sara.mohamed@orthoai.com",
    phone: "+201098765432",
    role: "patient",
    image: null,
    created_at: "2024-02-10T08:30:00Z",
    status: "active",
  },
  {
    id: 3,
    name: "Khaled Ali",
    email: "khaled.ali@orthoai.com",
    phone: "+201155556666",
    role: "patient",
    image: null,
    created_at: "2024-02-20T14:00:00Z",
    status: "pending",
  },
  {
    id: 4,
    name: "Nour Ibrahim",
    email: "nour.ibrahim@orthoai.com",
    phone: "+201211112222",
    role: "patient",
    image: null,
    created_at: "2024-03-05T09:15:00Z",
    status: "active",
  },
  {
    id: 5,
    name: "Omar Farouk",
    email: "omar.farouk@orthoai.com",
    phone: "+201333334444",
    role: "patient",
    image: null,
    created_at: "2024-03-18T11:45:00Z",
    status: "active",
  },
  {
    id: 6,
    name: "Layla Samir",
    email: "layla.samir@orthoai.com",
    phone: "+201566667777",
    role: "patient",
    image: null,
    created_at: "2024-04-01T16:00:00Z",
    status: "pending",
  },
  {
    id: 7,
    name: "Youssef Nabil",
    email: "youssef.nabil@orthoai.com",
    phone: "+201688889999",
    role: "patient",
    image: null,
    created_at: "2024-04-12T13:30:00Z",
    status: "active",
  },
  {
    id: 8,
    name: "Dina Mostafa",
    email: "dina.mostafa@orthoai.com",
    phone: "+201700001111",
    role: "patient",
    image: null,
    created_at: "2024-05-03T10:00:00Z",
    status: "active",
  },
];

export const DEMO_PAGINATION = {
  total: DEMO_USERS.length,
  per_page: 10,
  current_page: 1,
  last_page: 1,
};

export const getUsers = async ({ page = 1, search, per_page = 10 } = {}) => {
  let filtered = [...DEMO_USERS];
  if (search) {
    const q = search.toLowerCase();
    filtered = filtered.filter(
      (u) =>
        u.name.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q) ||
        u.phone?.includes(q)
    );
  }
  return {
    data: filtered,
    pagination: { ...DEMO_PAGINATION, total: filtered.length },
  };
};
