import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { BookService } from './book.service';
import { UIHelperService } from '../../../core/service/uihelper.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IBook, IBookResponseResult, NewBook } from '../book.model';

describe('BookService Test', () => {
  let service: BookService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [BookService, UIHelperService, MatSnackBar],
    });

    service = TestBed.inject(BookService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeDefined();
  });

  it('should create a book', () => {
    const newBook: NewBook = {
      id: null,
      title: 'Test',
      author: {
        id: 1,
        name: 'Test',
        surname: 'Test'
      },
      category: {
        id: 1,
        name: 'Test',
        code: 'Test',
        description: 'Test'
      },
      coverImageUrl: 'Test',
      description: 'Test'

    };

    service.create(newBook).subscribe((response) => {
      expect(response.status).toBe(200);
    });

    const req = httpTestingController.expectOne(service['resourceUrl']);
    expect(req.request.method).toBe('POST');
    req.flush({}, {status: 200, statusText: 'Created'});
  });

  it('should update a book', () => {
    const bookToUpdate: IBook = {
      id: 1,
      title: 'Test',
      author: {
        id: 1,
        name: 'Test',
        surname: 'Test'
      },
      category: {
        id: 1,
        name: 'Test',
        code: 'Test',
        description: 'Test'
      },
      coverImageUrl: 'Test',
      description: 'Test',
      categoryId: 1,

    };

    service.update(bookToUpdate).subscribe((response) => {
      expect(response.status).toBe(200);
    });

    const req = httpTestingController.expectOne(`${service['resourceUrl']}/${bookToUpdate.id}`);
    expect(req.request.method).toBe('PUT');
    req.flush({}, {status: 200, statusText: 'OK'});
  });

  it('should find a book by id', () => {
    const bookId = 1; // Replace with the ID of the book you want to test

    service.find(bookId).subscribe((response) => {
      expect(response.status).toBe(200);
    });

    const req = httpTestingController.expectOne(`${service['resourceUrl']}/${bookId}`);
    expect(req.request.method).toBe('GET');
    req.flush({}, {status: 200, statusText: 'OK'});
  });

  it('should query books', () => {
    // Provide any query parameters you want to test
    const queryParams = { /* Replace with query parameters as needed */};

    service.query(queryParams).subscribe((response) => {
      expect(response.status).toBe(200); // Assuming a successful query returns HTTP 200 status code
    });

    const req = httpTestingController.expectOne(service['resourceUrl']);
    expect(req.request.method).toBe('GET');
    // Modify this part to simulate a successful query response with your desired data
    req.flush({data: [], totalItems: 0} as IBookResponseResult);
  });

  it('should delete a book by id', () => {
    const bookId = 1; // Replace with the ID of the book you want to delete

    service.delete(bookId).subscribe((response) => {
      expect(response.status).toBe(200);
    });

    const req = httpTestingController.expectOne(`${service['resourceUrl']}/${bookId}`);
    expect(req.request.method).toBe('DELETE');
    // Simulate a successful delete with an empty response body
    req.flush({}, {status: 200, statusText: 'No Content'});
  });
});
