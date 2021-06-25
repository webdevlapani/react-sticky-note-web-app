export interface INote {
  id: number;
  description: string;
  color: string;
  isStarred: boolean;
}

export interface SortableItemProps {
  children: React.ReactNode;
}

export interface SortableListProps {
  items: INote[];
  onEdit(id: number): void;
  onDelete(id: number): void;
  onStar(id: number): void;
}

export interface StickyNoteProps {
  id: number;
  index: number;
  color: string;
  description: string;
  isStarred: boolean;
  onEdit(): void;
  onDelete(): void;
  onStar(): void;
}
