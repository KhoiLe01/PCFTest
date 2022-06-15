import {IInputs, IOutputs} from "./generated/ManifestTypes";
import connectDB from "./connectDB"
import { USINFO, EUINFO } from "./connectDB"
interface DATA {
    "None": string[];
    "US": string[];
    "EU": string[];
}

interface Element {
    Server: string;
    Project: string;
}

export class Testing implements ComponentFramework.StandardControl<IInputs, IOutputs> {

    private _container: HTMLDivElement

    private _marginOfError: HTMLInputElement;
    private _marginOfErrorVal: number;

    private _confidence: HTMLInputElement;
    private _confidenceVal: number;
    
    // private _USDropdown: HTMLOptGroupElement;
    // private _EUDropdown: HTMLOptGroupElement;
    // private _NoneDropDown: HTMLOptGroupElement;

    private _dropdownProject: HTMLSelectElement;
    private _dropdownProjectValue: string;

    private _USData: string[];
    private _EUData: string[];

    // private _data = async () => {
    //     const data = await this.CollectData();
    //     this._USData = data.US;
    //     return data
    // }

    private _data: (USINFO | EUINFO)[];
    private _isLoading: boolean;

    /**
     * Empty constructor.
     */
    constructor()
    {

    }

    /**
     * Used to initialize the control instance. Controls can kick off remote server calls and other initialization actions here.
     * Data-set values are not initialized here, use updateView.
     * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to property names defined in the manifest, as well as utility functions.
     * @param notifyOutputChanged A callback method to alert the framework that the control has new outputs ready to be retrieved asynchronously.
     * @param state A piece of data that persists in one session for a single user. Can be set at any point in a controls life cycle by calling 'setControlState' in the Mode interface.
     * @param container If a control is marked control-type='standard', it will receive an empty div element within which it can render its content.
     */
    public init(context: ComponentFramework.Context<IInputs>, notifyOutputChanged: () => void, state: ComponentFramework.Dictionary, container:HTMLDivElement): void
    {
        const loading = document.createElement("p");
        const node = document.createTextNode("Loading...")
        loading.appendChild(node)

        this._isLoading = true;
        container.appendChild(loading)
        
        connectDB().then((data) => {
            this._USData = data[0];
            this._EUData = data[1];
            this._container = document.createElement('div')
            container.append(this._container)

            this._marginOfError = document.createElement("input")
            this._marginOfError.setAttribute("type", "number")
            this._marginOfError.setAttribute("step", "any")

            this._confidence = document.createElement("input")
            this._confidence.setAttribute("type", "number")
            this._confidence.setAttribute("step", "any")

            this._dropdownProject = document.createElement("select")
            this._USData.forEach((element) => {
                const temp = document.createElement("option")
                temp.text = element
                temp.value = element
                this._dropdownProject.append(temp)
            })

            container.appendChild(this._dropdownProject)
            this._isLoading = false
        })
    }


    /**
     * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.
     * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions
     */
    public updateView(context: ComponentFramework.Context<IInputs>): void
    {
        // Add code to update control view
        if (this._isLoading){
            
        }
    }

    /**
     * It is called by the framework prior to a control receiving new data.
     * @returns an object based on nomenclature defined in manifest, expecting object[s] for property marked as “bound” or “output”
     */
    public getOutputs(): IOutputs
    {
        return {};
    }

    /**
     * Called when the control is to be removed from the DOM tree. Controls should use this call for cleanup.
     * i.e. cancelling any pending remote calls, removing listeners, etc.
     */
    public destroy(): void
    {
        // Add code to cleanup control if necessary
    }
}
