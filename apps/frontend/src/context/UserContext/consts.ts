export type User = {
  id: number;
  name: string;
  token: string;
};

export const USERS: User[] = [
  {
    id: 1,
    name: "User 1",
    token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImlhdCI6MTc1NzM2OTU2OCwiZXhwIjoxNzg4OTA1NTY4fQ.lRcRZ9zonuuITvRWVjU892gGtIgGYJG0Traxh1UBy-4",
  },
  {
    id: 2,
    name: "User 2",
    token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjIsImlhdCI6MTc1NzM3MzI4NCwiZXhwIjoxNzg4OTA5Mjg0fQ.4mKC0-1FZhs-dtuqV911bbsnphCEkw9y0GUaDzhNtRg",
  },
];
