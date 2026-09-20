export interface UserAccount {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'PILGRIM' | 'PANDIT' | 'DRIVER' | 'HOTEL' | 'ADMIN' | 'SUPER_ADMIN';
  status: 'VERIFIED' | 'PENDING' | 'SUSPENDED';
  city?: string;
  languages?: string[];
  createdAt: string;
  avatarUrl?: string;
  rating?: number;
}

const STORAGE_KEY = 'GAYASEVA_USERS_STORE';

const DEFAULT_USERS: UserAccount[] = [
  {
    id: 'usr_super',
    name: 'Vikramaditya Sharma',
    email: 'superadmin@gayaseva.org',
    phone: '+919876543200',
    role: 'SUPER_ADMIN',
    status: 'VERIFIED',
    city: 'Gaya Ji',
    createdAt: '2026-01-01T00:00:00.000Z',
    rating: 5.0,
  },
  {
    id: 'usr_pnd1',
    name: 'Pandit Rajesh Shastri',
    email: 'rajesh.shastri@gayaseva.org',
    phone: '+919876543210',
    role: 'PANDIT',
    status: 'VERIFIED',
    city: 'Vishnupad Zone',
    languages: ['Hindi', 'Sanskrit', 'Bengali'],
    createdAt: '2026-02-10T00:00:00.000Z',
    rating: 4.9,
  },
  {
    id: 'usr_drv1',
    name: 'Ramesh Kumar (Taxi Service)',
    email: 'ramesh.cab@gayaseva.org',
    phone: '+919876543220',
    role: 'DRIVER',
    status: 'VERIFIED',
    city: 'Gaya Junction',
    createdAt: '2026-02-15T00:00:00.000Z',
    rating: 4.8,
  },
  {
    id: 'usr_htl1',
    name: 'Sri Vishnupad Yatri Dharamshala',
    email: 'dharamshala@gayaseva.org',
    phone: '+919876543230',
    role: 'HOTEL',
    status: 'VERIFIED',
    city: 'Vishnupad Temple Area',
    createdAt: '2026-03-01T00:00:00.000Z',
    rating: 4.9,
  },
  {
    id: 'usr_pilgrim1',
    name: 'Sunita Banerjee',
    email: 'sunita.banerjee@gmail.com',
    phone: '+919876543240',
    role: 'PILGRIM',
    status: 'VERIFIED',
    city: 'Kolkata',
    createdAt: '2026-03-05T00:00:00.000Z',
  }
];

export const UserStore = {
  getUsers(): UserAccount[] {
    if (typeof window === 'undefined') return DEFAULT_USERS;
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_USERS));
        return DEFAULT_USERS;
      }
      return JSON.parse(stored);
    } catch (e) {
      return DEFAULT_USERS;
    }
  },

  saveUsers(users: UserAccount[]) {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
      window.dispatchEvent(new Event('storage'));
    } catch (e) {
      console.error('Failed to save users to localStorage', e);
    }
  },

  addUser(user: Omit<UserAccount, 'id' | 'createdAt'>): UserAccount {
    const users = this.getUsers();
    const newUser: UserAccount = {
      ...user,
      id: `usr_${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    const updated = [newUser, ...users];
    this.saveUsers(updated);
    return newUser;
  },

  updateUser(id: string, updates: Partial<UserAccount>): UserAccount | null {
    const users = this.getUsers();
    let updatedUser: UserAccount | null = null;
    const updated = users.map((u) => {
      if (u.id === id) {
        updatedUser = { ...u, ...updates };
        return updatedUser;
      }
      return u;
    });
    if (updatedUser) {
      this.saveUsers(updated);
    }
    return updatedUser;
  },

  deleteUser(id: string): boolean {
    const users = this.getUsers();
    const filtered = users.filter((u) => u.id !== id);
    if (filtered.length !== users.length) {
      this.saveUsers(filtered);
      return true;
    }
    return false;
  }
};
