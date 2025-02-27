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

export type SupportTicket = {
  id: string;
  name: string;
  email: string;
  subject: string;
  category: "account" | "technical" | "billing" | "content" | "other";
  description: string;
  attachments?: string[];
  priority: "low" | "medium" | "high";
  status: "open" | "in-progress" | "resolved" | "closed";
  createdAt: Date;
  updatedAt: Date;
};

export type FAQ = {
  id: string;
  question: string;
  answer: string;
  category: string;
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
export const supportTickets: SupportTicket[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john.doe@example.com",
    subject: "Cannot upload profile picture",
    category: "technical",
    description:
      "I've been trying to upload a new profile picture but keep getting an error message saying 'File too large'. The image is only 2MB which should be within limits.",
    priority: "medium",
    status: "open",
    createdAt: new Date("2023-06-10T14:30:00"),
    updatedAt: new Date("2023-06-10T14:30:00"),
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    subject: "Billing issue with premium subscription",
    category: "billing",
    description:
      "I was charged twice for my premium subscription this month. Please refund the extra charge and fix this issue for future payments.",
    priority: "high",
    status: "in-progress",
    createdAt: new Date("2023-06-08T09:15:00"),
    updatedAt: new Date("2023-06-09T11:20:00"),
  },
  {
    id: "3",
    name: "Robert Johnson",
    email: "robert.johnson@example.com",
    subject: "How to delete a post",
    category: "content",
    description:
      "I accidentally posted something I didn't mean to share. How can I delete this post? I can't find any delete option on the post itself.",
    priority: "low",
    status: "resolved",
    createdAt: new Date("2023-06-05T16:45:00"),
    updatedAt: new Date("2023-06-06T10:30:00"),
  },
];
export const faqs: FAQ[] = [
  {
    id: "1",
    question: "How do I create a new post?",
    answer:
      "To create a new post, navigate to the main feed and use the post form at the top of the page. You can add text and optionally include an image by clicking the 'Add Image' button.",
    category: "posting",
  },
  {
    id: "2",
    question: "How do I comment on a post?",
    answer:
      "To comment on a post, click the 'Comment' button below the post. This will open the comment section where you can write and submit your comment.",
    category: "posting",
  },
  {
    id: "3",
    question: "How do I change my profile picture?",
    answer:
      "To change your profile picture, go to your profile page by clicking on your name or picture in the sidebar. Then click on the 'Edit Profile' button and upload a new image.",
    category: "account",
  },
  {
    id: "4",
    question: "How do I reset my password?",
    answer:
      "To reset your password, go to the login page and click on 'Forgot Password'. Enter your email address and follow the instructions sent to your email.",
    category: "account",
  },
  {
    id: "5",
    question: "How do I report inappropriate content?",
    answer:
      "To report inappropriate content, click the three dots menu on the post or comment and select 'Report'. Choose the reason for reporting and submit the form.",
    category: "moderation",
  },
  {
    id: "6",
    question: "How do I delete my account?",
    answer:
      "To delete your account, go to your profile settings, scroll to the bottom, and click on 'Delete Account'. You will need to confirm this action as it cannot be undone.",
    category: "account",
  },
  {
    id: "7",
    question: "How do I create a private group?",
    answer:
      "To create a private group, go to the Groups section and click 'Create New Group'. Set the privacy settings to 'Private' and add members by inviting them via email or username.",
    category: "groups",
  },
  {
    id: "8",
    question: "How do I block another user?",
    answer:
      "To block another user, visit their profile page and click the three dots menu in the top right. Select 'Block User' from the dropdown menu and confirm your decision.",
    category: "moderation",
  },
];
