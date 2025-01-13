import { computed, inject, Injectable } from "@angular/core";
import {BreakpointObserver} from "@angular/cdk/layout"
import {toSignal} from "@angular/core/rxjs-interop"


@Injectable({
   providedIn: "root"
})

export class ResponsiveService {
   private readonly small = '(max-width: 776px)';
   private readonly medium = '(min-width: 777px) and (max-width: 1020px)';
   private readonly large = '(min-width: 1021px)';

   breakpointObserver = inject(BreakpointObserver)

   screenwidth = toSignal(this.breakpointObserver.observe([this.small, this.medium, this.large]))

   smallWidth = computed(()=> this.screenwidth()?.breakpoints[this.small])
   mediumWidth = computed(()=> this.screenwidth()?.breakpoints[this.medium])
   largeWidth = computed(()=> this.screenwidth()?.breakpoints[this.large])
}