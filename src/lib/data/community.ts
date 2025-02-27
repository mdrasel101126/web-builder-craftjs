// Mock data for the community discussion page

export type User = {
  id: string;
  name: string;
  image: string;
};

export type Post = {
  id: string;
  content: string;
  image?: string;
  createdAt: Date;
  author: User;
  likes: number;
  comments: Comment[];
};

export type Comment = {
  id: string;
  content: string;
  createdAt: Date;
  author: User;
  likes: number;
};

export const currentUser: User = {
  id: "1",
  name: "John Doe",
  image:
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
};

export const users: User[] = [
  currentUser,
  {
    id: "2",
    name: "Jane Smith",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    id: "3",
    name: "Robert Johnson",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    id: "4",
    name: "Emily Davis",
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
];

export const posts: Post[] = [
  {
    id: "1",
    content:
      "Just launched my new website! Check it out and let me know what you think.",
    image:
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
    createdAt: new Date("2023-05-15T10:30:00"),
    author: users[1],
    likes: 24,
    comments: [
      {
        id: "1",
        content: "Looks amazing! Great job on the design.",
        createdAt: new Date("2023-05-15T11:15:00"),
        author: users[2],
        likes: 5,
      },
      {
        id: "2",
        content: "The UI is so clean and intuitive. Love it!",
        createdAt: new Date("2023-05-15T12:45:00"),
        author: users[0],
        likes: 3,
      },
    ],
  },
  {
    id: "2",
    content:
      "Has anyone tried the new React 18 features? I'm particularly interested in the new concurrent rendering capabilities.",
    createdAt: new Date("2023-05-14T15:20:00"),
    author: users[2],
    likes: 18,
    comments: [
      {
        id: "3",
        content:
          "Yes! The new batching updates are a game changer for performance.",
        createdAt: new Date("2023-05-14T16:10:00"),
        author: users[3],
        likes: 7,
      },
    ],
  },
  {
    id: "3",
    content: "Beautiful sunset at the beach today. Nature is truly amazing!",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
    createdAt: new Date("2023-05-13T19:45:00"),
    author: users[3],
    likes: 42,
    comments: [
      {
        id: "4",
        content: "Wow! Where was this taken?",
        createdAt: new Date("2023-05-13T20:05:00"),
        author: users[1],
        likes: 2,
      },
      {
        id: "5",
        content: "The colors are breathtaking!",
        createdAt: new Date("2023-05-13T20:30:00"),
        author: users[0],
        likes: 4,
      },
      {
        id: "6",
        content: "I need to visit this place soon!",
        createdAt: new Date("2023-05-13T21:15:00"),
        author: users[2],
        likes: 1,
      },
    ],
  },
];
