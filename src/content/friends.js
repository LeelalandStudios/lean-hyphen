export const FRIENDS = [
  { id: "aryan", name: "Aryan", avatarSrc: "/avatars/aryan.png" },
  { id: "diya", name: "Diya", avatarSrc: "/avatars/diya.png" },
  { id: "kabir", name: "Kabir", avatarSrc: "/avatars/kabir.png" },
  { id: "priya", name: "Priya", avatarSrc: "/avatars/priya.png" },
];

export const FRIEND_AVATAR_BY_NAME = Object.fromEntries(
  FRIENDS.map((f) => [f.name, f.avatarSrc])
);

