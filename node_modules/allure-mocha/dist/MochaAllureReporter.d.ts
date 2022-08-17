import * as Mocha from "mocha";
import { MochaAllure } from "./MochaAllure";
export declare let allure: MochaAllure;
export declare class MochaAllureReporter extends Mocha.reporters.Base {
    readonly runner: Mocha.Runner;
    readonly opts: Mocha.MochaOptions;
    private coreReporter;
    constructor(runner: Mocha.Runner, opts: Mocha.MochaOptions);
    private onSuite;
    private onSuiteEnd;
    private onTest;
    private onPassed;
    private onFailed;
    private onPending;
    private onHookStart;
    private onHookEnd;
}
