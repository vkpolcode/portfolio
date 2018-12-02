import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Observable, BehaviorSubject } from 'rxjs';
import { Portfolio } from 'src/app/models/portfolio';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {
  list: Observable<Portfolio[]>;
  private list$: BehaviorSubject<Portfolio[]>;
  private apiEndpoint: string;
  private ids: number[];

  constructor(
    private apiService: ApiService
  ) {
    this.apiEndpoint = 'Portfolios';
    this.ids = [];
    this.list$ = new BehaviorSubject([]);
    this.list = this.list$.asObservable();
    this.list.subscribe();
  }

  getList() {
    this.apiService
      .get(this.apiEndpoint)
      .subscribe((response: HttpResponse<Portfolio[]>) => {
        const list: Portfolio[] = [];
        for (const item of response.body) {
          const portfolio = new Portfolio(item);
          this.ids.push(portfolio.getId);
          list.push(portfolio);
        }
        list.sort((a: Portfolio, b: Portfolio) => {
          return a.getId - b.getId;
        });
        this.list$.next(list);
      });
  }

  getPortfolio(id: number): Promise<Portfolio | null> {
    return new Promise((resolve, reject) => {
      if (id) {
        this.apiService
          .get(`${this.apiEndpoint}/${id}`)
          .toPromise().then((response: HttpResponse<Portfolio>) => {
            if (response.status === 200) {
              resolve(new Portfolio(response.body));
            } else {
              resolve(null);
            }
          }).catch((error: HttpErrorResponse) => {
            reject(error.message);
          });
      } else {
        resolve(null);
      }
    });
  }

  save(id: number, data: Portfolio): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const options = { body: data };
      if (id) {
        // Portfolio Update Nie Działa API
        // this.apiService
        //   .put(`${this.apiEndpoint}/${id}`, options)
        //   .toPromise().then((response: HttpResponse<any>) => {
        //     if (response.status === 200) {
        //       resolve(true);
        //     } else {
        //       resolve(false);
        //     }
        //   }).catch((error: HttpErrorResponse) => {
        //     reject(error.message);
        //   });
        this.remove(id).then((result: boolean) => {
          if (result) {
            this.apiService
              .post(`${this.apiEndpoint}`, options)
              .toPromise().then((response: HttpResponse<any>) => {
                if (response.status === 200) {
                  resolve(true);
                } else {
                  resolve(false);
                }
              }).catch((error: HttpErrorResponse) => {
                reject(error.message);
              });
          } else {
            resolve(false);
          }
        });
      } else {
        this.apiService
          .post(`${this.apiEndpoint}`, options)
          .toPromise().then((response: HttpResponse<any>) => {
            if (response.status === 200) {
              resolve(true);
            } else {
              resolve(false);
            }
          }).catch((error: HttpErrorResponse) => {
            reject(error.message);
          });
      }
    });
  }

  remove(id: number): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.apiService
        .delete(`${this.apiEndpoint}/${id}`)
        .toPromise().then((response: HttpResponse<any>) => {
          if (response.status === 200) {
            resolve(true);
          } else {
            resolve(false);
          }
        }).catch((error: HttpErrorResponse) => {
          reject(error.message);
        });
    });
  }

  public generateID(): number {
    if (this.ids) {
      return Math.max.apply(Math, this.ids) + 1;
    } else {
      return 1;
    }
  }
}
