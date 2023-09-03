import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CategoryService } from './category.service';
import { NewCategory, ICategory } from '../category.model';

describe('CategoryService Test', () => {
    let service: CategoryService;
    let httpTestingController: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [CategoryService],
        });

        service = TestBed.inject(CategoryService);
        httpTestingController = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpTestingController.verify();
    });

    it('should create a category', () => {
        const newCategory: NewCategory = {
            id: null,
            name: 'Test Category',
            description: 'Test Description',
            code: 'Test Code'
        };

        service.create(newCategory).subscribe((response) => {
            expect(response.status).toBe(200); // Assuming a successful creation returns HTTP 200 status code
        });

        const req = httpTestingController.expectOne(service['resourceUrl']);
        expect(req.request.method).toBe('POST');
        // Provide a mock response object with status code 201 for a successful creation
        req.flush({}, {status: 200, statusText: 'Created'});
    });

    it('should update a category', () => {
        const categoryToUpdate: ICategory = {
            id: 1,
            name: 'Test Category',
            description: 'Test Description',
            code: 'Test Code'
        };

        service.update(categoryToUpdate).subscribe((response) => {
            expect(response.status).toBe(200); // Assuming a successful update returns HTTP 200 status code
        });

        const req = httpTestingController.expectOne(`${service['resourceUrl']}/${categoryToUpdate.id}`);
        expect(req.request.method).toBe('PUT');
        // Provide a mock response object with status code 200 for a successful update
        req.flush({}, {status: 200, statusText: 'OK'});
    });

    it('should find a category by id', () => {
        const categoryId = 1; // Replace with the ID of the category you want to test

        service.find(categoryId).subscribe((response) => {
            expect(response.status).toBe(200); // Assuming a successful find returns HTTP 200 status code
        });

        const req = httpTestingController.expectOne(`${service['resourceUrl']}/${categoryId}`);
        expect(req.request.method).toBe('GET');
        // Provide a mock response object with status code 200 for a successful find
        req.flush({}, {status: 200, statusText: 'OK'});
    });

    it('should query categories', () => {
        // Provide any query parameters you want to test
        const queryParams = { /* Replace with query parameters as needed */};

        service.query(queryParams).subscribe((response) => {
            expect(response.status).toBe(200); // Assuming a successful query returns HTTP 200 status code
        });

        const req = httpTestingController.expectOne(service['resourceUrl']);
        expect(req.request.method).toBe('GET');
        // Modify this part to simulate a successful query response with your desired data
        req.flush([], {status: 200, statusText: 'OK'});
    });

    it('should delete a category by id', () => {
        const categoryId = 1; // Replace with the ID of the category you want to delete

        service.delete(categoryId).subscribe((response) => {
            expect(response.status).toBe(204); // Assuming a successful delete returns HTTP 204 status code
        });

        const req = httpTestingController.expectOne(`${service['resourceUrl']}/${categoryId}`);
        expect(req.request.method).toBe('DELETE');
        // Simulate a successful delete with an empty response body
        req.flush({}, {status: 204, statusText: 'No Content'});
    });
});
