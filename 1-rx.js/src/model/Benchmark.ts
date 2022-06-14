import { concatMap, delay, exhaustMap, from, mergeMap, Observable, of, Subscription, switchMap, take } from "rxjs";
import { renderBenchmarkResult } from "../lib/render";
import { randomNumberRange } from "../lib/util";
import { Configuration } from "./Configuration";
import { Software } from "./Software";

export class Benchmark {
    private config: Configuration;
    private software$: Observable<Software[]>;

    private subscription_one: Subscription;
    private subscription_multiple: Subscription;

    constructor(configuration: Configuration, software$: Observable<Software[]>) {
        this.config = configuration;
        this.software$ = software$;
    }

    public startAllBenchmarks() : void {
        if(this.subscription_one) { this.subscription_one.unsubscribe(); console.log("A"); }
        if(this.subscription_multiple) { this.subscription_multiple.unsubscribe(); console.log("B"); }


        this.subscription_multiple = this.software$.subscribe((software_list: Software[]) => {
            this.runBenchmark(software_list);
        });
    }

    public runBenchmark(software_list: Software[]) : void {

        this.subscription_one = from(software_list).pipe(
            concatMap((sofware: Software) => of(sofware).pipe(delay(randomNumberRange(100, 1000))))
        ) // svaki sofware iz liste pretvara u observable
        .subscribe((sw: Software) => {
            this.calculatePerformance(this.config.getPerforamanceMetric(), sw);
        });
    }

    public calculatePerformance(configPoints: number, software: Software) : void {
        // 3 stadijuma merenja performansi: BAD, GOOD, EXCELENT
        // BAD -> 0% - 35%
        // GOOD -> 35% - 85%
        // EXCELENT -> 85% - 100% (i preko 100%)

        let percentage: number = configPoints / software.sysreq;
        let borderColor: string = '#FFF';
        let finalMetrics: string = '';

        if(percentage >= 0 && percentage < 0.35) {
            finalMetrics = "BAD"; borderColor = '#CD5C5C';
        } else if(percentage >= 0.35 && percentage < 0.85) {
            finalMetrics = "GOOD"; borderColor = '#FFD700';
        } else if(percentage >= 0.85) {
            finalMetrics = "EXCELENT"; borderColor = '#7FFF00';
        } else {
            finalMetrics = "ERROR"; borderColor = '#000';
        }

        const resultDiv: HTMLDivElement = document.querySelector('#resultsDiv');
        if(resultDiv) {
            renderBenchmarkResult(resultDiv, configPoints, software.sysreq, software.name, finalMetrics, borderColor);
        } else {
            console.log("Div not found!");
        }
    }
}