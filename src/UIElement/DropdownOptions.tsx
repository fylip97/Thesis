import { PanelData, SelectableValue } from '@grafana/data';
import { getAllElementInfo } from '../processMetric/ConvertData'

export function dropdownOptions(allOptions: string[], value: string) {

    var copy = allOptions.slice(0);
    for (let i = 0; i < copy.length; i++) {
        if (copy[i] === value) {
            copy.splice(i, 1);
        }
    }

    let options: Array<SelectableValue> = [];
    for (let i = 0; i < copy.length; i++) {
        let element: SelectableValue = {};
        element.label = copy[i];
        options.push(element);
    }
    return options;
}


export function dropdownGroupedOptions(allOptions: string[], value: string, levelOption: string) {

    let options: string[] = new Array();

    if (value !== "-") {
        options.push("-");
    }

    if (levelOption !== "Overview") {
        for (let i = 0; i < allOptions.length; i++) {

            if (allOptions[i] === levelOption) {
                break;
            } else {
                options.push(allOptions[i]);
            }
        }
    }

    let test: Array<SelectableValue> = [];
    for (let i = 0; i < options.length; i++) {
        let element: SelectableValue = {};
        element.label = options[i];
        test.push(element);
    }

    return test;
}


export function dropdownOptionsFilter(data: PanelData, value: string | undefined, levelOption: String) {

    let option: Array<SelectableValue> = [];
    let firstElement: SelectableValue = {};

    if (value !== "-") {
        firstElement.label = "-";
        option.push(firstElement);
    }

    if (levelOption !== "Overview") {
        const allElement = getAllElementInfo(data);

        for (let i = 0; i < allElement.length; i++) {
            let namespaceElement: SelectableValue = {};
            namespaceElement.label = allElement[i].Name;
            namespaceElement.description = "Namespace";
            option.push(namespaceElement);
        }

        for (let i = 0; i < allElement.length; i++) {
            for (let l = 0; l < allElement[i].Deployment.length; l++) {
                let podElement: SelectableValue = {};
                podElement.label = allElement[i].Deployment[l].Name;
                podElement.description = "Deployment";

                option.push(podElement)
            }
        }


        for (let i = 0; i < allElement.length; i++) {
            for (let l = 0; l < allElement[i].Pod.length; l++) {
                let podElement: SelectableValue = {};
                podElement.label = allElement[i].Pod[l].Name;
                podElement.description = "Pod";

                option.push(podElement)
            }
        }

        for (let i = 0; i < allElement.length; i++) {
            for (let l = 0; l < allElement[i].Pod.length; l++) {
                for (let j = 0; j < allElement[i].Pod[l].Container.length; j++) {
                    let containerElement: SelectableValue = {};
                    containerElement.label = allElement[i].Pod[l].Container[j].Name;
                    containerElement.description = "Container";

                    option.push(containerElement);
                }
            }
        }
    }
    return option;
}


export function dropdownInfrastructureOption(value: string, level: string) {

    let option: Array<SelectableValue> = [];
    let all = ["CPU Usage", "Memory Usage"];

    if (level !== "Container") {
        const notContainerLevel = [
            "Network receive total",
            "Network transmit total",
            "Network receive saturation",
            "Network transmit saturation",
            "Network receive errors",
            "Network transmit errors"];

        all.concat(notContainerLevel);
    }

    for (let i = 0; i < all.length; i++) {
        let oneElement: SelectableValue = { label: all[i] }
        if (value !== oneElement.label) {
            option.push(oneElement);
        }
    }
    return option;
}


export function dropdownApplicationOption(value: string) {

    let option: Array<SelectableValue> = [];
    const all = ["Service in count",
        "Service out count",
        "Service in responsetime sum",
        "Service out responsetime sum",
        "http in responsetime sum",
        "http out responsetime sum",
        "jvm memory heap",
        "jvm memory non heap"];

    for (let i = 0; i < all.length; i++) {
        let oneElement: SelectableValue = { label: all[i] }
        if (value !== oneElement.label) {
            option.push(oneElement);
        }
    }
    return option;

}


export function dropdownNodeOption(value: string) {

    let option: Array<SelectableValue> = [];
    const all = ["Write total",
        "Read total",
        "Alloctable CPU Cores",
        "Alloctable Memory Bytes",
        "Active Memory",
        "Inactive Memory"];

    for (let i = 0; i < all.length; i++) {
        let oneElement: SelectableValue = { label: all[i] }

        if (value !== oneElement.label) {
            option.push(oneElement);
        }
    }
    return option;

}






