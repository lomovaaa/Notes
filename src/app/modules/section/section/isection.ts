import { INote } from '../note/inote';
export interface ISection {
    sectionId: number;
    sectionTitle: string;
    notes: INote[];
}
