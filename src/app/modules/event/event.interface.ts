export interface IEvent {
  title: string;
  description: string;
  date: string;
  category: string;
  imageUrl: string;
  videoUrl: string;
  type: "ended" | "upcoming";
}
