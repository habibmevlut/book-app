import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthorService } from './author.service';
import { NewAuthor, IAuthor } from '../author.model';

describe('AuthorService Test', () => {
  let service: AuthorService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthorService],
    });

    service = TestBed.inject(AuthorService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should create an author', () => {
    const newAuthor: NewAuthor = {
      id: null,
      name: 'Test',
      surname: 'Test',
      profileImage: 'Test'
    };

    service.create(newAuthor).subscribe((response) => {
      expect(response.status).toBe(200);
    });

    const req = httpTestingController.expectOne(service['resourceUrl']);
    expect(req.request.method).toBe('POST');
    // Provide a mock response object with status code 200 for a successful creation
    req.flush({}, {status: 200, statusText: 'Created'});
  });

  it('should update an author', () => {
    const authorToUpdate: IAuthor = {
      id: 1,
      name: 'Test',
      surname: 'Test',
      profileImage: 'Test'
    };

    service.update(authorToUpdate).subscribe((response) => {
      expect(response.status).toBe(200);
    });

    const req = httpTestingController.expectOne(`${service['resourceUrl']}/${authorToUpdate.id}`);
    expect(req.request.method).toBe('PUT');
    // Provide a mock response object with status code 200 for a successful update
    req.flush({}, {status: 200, statusText: 'OK'});
  });

  it('should find an author by id', () => {
    const authorId = 1; // Replace with the ID of the author you want to test

    service.find(authorId).subscribe((response) => {
      expect(response.status).toBe(200);
    });

    const req = httpTestingController.expectOne(`${service['resourceUrl']}/${authorId}`);
    expect(req.request.method).toBe('GET');
    req.flush({}, {status: 200, statusText: 'OK'});
  });

  it('should query authors', () => {
    // Provide any query parameters you want to test
    const queryParams = { /* Replace with query parameters as needed */};

    service.query(queryParams).subscribe((response) => {
      expect(response.status).toBe(200);
    });

    const req = httpTestingController.expectOne(service['resourceUrl']);
    expect(req.request.method).toBe('GET');
    req.flush([], {status: 200, statusText: 'OK'});
  });

  it('should delete an author by id', () => {
    const authorId = 1; // Replace with the ID of the author you want to delete

    service.delete(authorId).subscribe((response) => {
      expect(response.status).toBe(204);
    });

    const req = httpTestingController.expectOne(`${service['resourceUrl']}/${authorId}`);
    expect(req.request.method).toBe('DELETE');
    // Simulate a successful delete with an empty response body
    req.flush({}, {status: 204, statusText: 'No Content'});
  });
});
