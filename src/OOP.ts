
// ==============
// Вам необхідно написати додаток Todo list. У списку нотаток повинні бути методи для додавання нового запису,
// видалення, редагування та отримання повної інформації про нотатку за ідентифікатором,
//  а так само отримання списку всіх нотаток. Крім цього, у користувача має бути можливість позначити нотаток,
//   як виконаний, і отримання інформації про те, скільки всього нотаток у списку і скільки залишилося невиконаними.
//   Нотатки не повинні бути порожніми.
// Кожний нотаток має назву, зміст, дату створення і редагування та статус. Нотатки бувають двох типів.
//  Дефолтні та такі, які вимагають підтвердження при ридагуванні.
// Окремо необхідно розширити поведінку списку та додати можливість пошуку нотатка за ім'ям або змістом.
// Також окремо необхідно розширити список можливістю сортування нотаток за статусом або часом створення.

enum NoteStatus {
  active = 'active',
  finished = 'finished',
}

class Note {
    constructor(
      protected _name: string,
      protected _content: string,
      readonly _createdAt: number,
      protected _changedAt: number,
      protected _status: NoteStatus
    ) {}
  
    get name(): string {
      return this._name;
    }
    get content(): string {
      return this._content;
    }
    get changedAt(): number {
      return this._changedAt;
    }
    get status(): NoteStatus {
      return this._status;
    }
  
    editName(name: string): void {
      this._name = name;
      this.updateChangedAt();
    }
    editContent(content: string): void {
      this._content = content;
      this.updateChangedAt();
    }
    editStatus(status: NoteStatus): void {
      this._status = status;
      this.updateChangedAt();
    }
  
    private updateChangedAt(): void {
      this._changedAt = Date.now();
    }
  }

class NoteWithConfirmation extends Note {
  constructor(
    protected _name: string,
    protected _content: string,
    readonly _createdAt: number,
    protected _changedAt: number,
    protected _status: NoteStatus
  ) {
    super(_name, _content, _createdAt, _changedAt, _status);
  }
//   in that class we have to override all setters with confirmEdit(), i will write only one as example
//  Maxim, can we use decorators for that?
  override editName(name: string): void {
    if (this.confirmEdit()) {
      super.editName(name);
    }
  }

  private confirmEdit(): boolean {
    // some confirm logic
    return true
  }

}

type AllNotesTypes = Note | NoteWithConfirmation;

class NoteList {
  private _list: AllNotesTypes[] = [];
  get list() {
    return this._list;
  }

  addNode(note: AllNotesTypes) {
    this.list.push(note);
  }
  removeNote(note: AllNotesTypes): void {
    this._list = this._list.filter(n => n !== note);
  }
  editNote(name: string, updatedContent: string): void {
    const note = this._list.find(n => n.name === name);
    if (note) {
      if (note instanceof Note) {
        (note as Note).editContent(updatedContent);
      } else {
        (note as NoteWithConfirmation).editContent(updatedContent)
      }
    }
  }

  getNoteCount(): number {
    return this._list.length;
  }

  getOpenNotesCount(): number {
    return this._list.filter(n => n.status === NoteStatus.active).length;
  }

  getNote(key: 'name' | 'content', value: string): Note[] {
    return this._list.filter(n => n[key] === value);
  }

  sortNotes(sortBy: 'status' | 'createdAt'): void {
    switch (sortBy) {
      case 'status':
        this._list.sort((a, b) => a.status.localeCompare(b.status));
        break;
      case 'createdAt':
        this._list.sort((a, b) => a._createdAt - b._createdAt);
        break;
      default:
        break;
    }
  }
}

const cleanRoom: Note = new Note('leavingroom', 'clean room', Date.now(), Date.now(), NoteStatus.active);
const toDoList: NoteList = new NoteList();
toDoList.addNode(cleanRoom);
