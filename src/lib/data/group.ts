export type User = {
  id: string;
  name: string;
  image: string;
};

export type Group = {
  id: string;
  name: string;
  description?: string;
  privacy: "public" | "private";
  coverImage?: string;
  memberCount: number;
  members: User[];
  createdAt: string;
  lastActive: string;
};

export type Post = {
  id: string;
  content: string;
  imageUrl?: string;
  author: User;
  group: Group;
  likes: number;
  comments: Comment[];
  createdAt: string;
};

export type Comment = {
  id: string;
  content: string;
  author: User;
  post: string;
  likes: number;
  createdAt: string;
};

export type Tab = {
  id: string;
  label: string;
  href: string;
};

export const currentUser: User = {
  id: "user-1",
  name: "John Doe",
  image:
    "https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=100&auto=format&fit=crop",
};

export const users: User[] = [
  currentUser,
  {
    id: "user-2",
    name: "Jane Smith",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&auto=format&fit=crop",
  },
  {
    id: "user-3",
    name: "Robert Johnson",
    image:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=100&auto=format&fit=crop",
  },
  {
    id: "user-4",
    name: "Emily Davis",
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=100&auto=format&fit=crop",
  },
  {
    id: "user-5",
    name: "Michael Wilson",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop",
  },
];

export const groups: Group[] = [
  {
    id: "group-1",
    name: "Phitron Alumni Association",
    description:
      "A community for all Phitron alumni to connect and share opportunities.",
    privacy: "private",
    coverImage:
      "https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=1200&auto=format&fit=crop",
    memberCount: 377,
    members: users,
    createdAt: "2023-01-15T10:00:00Z",
    lastActive: "2023-06-10T14:30:00Z",
  },
  {
    id: "group-2",
    name: "CSE Job Bangladesh",
    description:
      "Job opportunities for Computer Science graduates in Bangladesh.",
    privacy: "public",
    coverImage:
      "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=1200&auto=format&fit=crop",
    memberCount: 1250,
    members: [users[0], users[1], users[2]],
    createdAt: "2022-11-05T09:15:00Z",
    lastActive: "2023-06-11T08:45:00Z",
  },
  {
    id: "group-3",
    name: "MERN Stack Developers",
    description:
      "A group for MERN stack developers to discuss technologies and best practices.",
    privacy: "public",
    coverImage:
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1200&auto=format&fit=crop",
    memberCount: 843,
    members: [users[0], users[3], users[4]],
    createdAt: "2022-08-20T11:30:00Z",
    lastActive: "2023-06-11T10:15:00Z",
  },
  {
    id: "group-4",
    name: "Department of CSE, Sylhet Engineering College",
    description:
      "Official group for CSE department students and alumni of Sylhet Engineering College.",
    privacy: "private",
    coverImage:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1200&auto=format&fit=crop",
    memberCount: 567,
    members: [users[0], users[2], users[4]],
    createdAt: "2022-05-12T13:45:00Z",
    lastActive: "2023-06-10T16:20:00Z",
  },
];

export const comments: Comment[] = [
  {
    id: "comment-1",
    content: "This is really helpful, thanks for sharing!",
    author: users[1],
    post: "post-1",
    likes: 5,
    createdAt: "2023-06-10T15:30:00Z",
  },
  {
    id: "comment-2",
    content: "I've been looking for this information. Great post!",
    author: users[2],
    post: "post-1",
    likes: 3,
    createdAt: "2023-06-10T16:15:00Z",
  },
  {
    id: "comment-3",
    content: "Can you share more resources on this topic?",
    author: users[3],
    post: "post-2",
    likes: 2,
    createdAt: "2023-06-11T09:45:00Z",
  },
];

export const posts: Post[] = [
  {
    id: "post-1",
    content:
      "Just completed the advanced web development course at Phitron! Excited to apply these skills in my next project.",
    imageUrl:
      "https://images.unsplash.com/photo-1587620962725-abab7fe55159?q=80&w=800&auto=format&fit=crop",
    author: users[0],
    group: groups[0],
    likes: 24,
    comments: [comments[0], comments[1]],
    createdAt: "2023-06-10T14:00:00Z",
  },
  {
    id: "post-2",
    content:
      "We're hiring frontend developers with React experience. DM me if interested!",
    author: users[2],
    group: groups[1],
    likes: 18,
    comments: [comments[2]],
    createdAt: "2023-06-11T09:30:00Z",
  },
  {
    id: "post-3",
    content:
      "Check out this new MongoDB aggregation pipeline tutorial I wrote. It covers advanced techniques for data processing.",
    imageUrl:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop",
    author: users[4],
    group: groups[2],
    likes: 32,
    comments: [],
    createdAt: "2023-06-11T10:00:00Z",
  },
];

export const joinedGroups = groups;

export const tabs: { id: string; label: string }[] = [
  { id: "discussion", label: "Discussion" },
  { id: "featured", label: "Featured" },
  { id: "members", label: "Members" },
  { id: "events", label: "Events" },
  { id: "media", label: "Media" },
  { id: "files", label: "Files" },
];
