import {IInputs, IOutputs} from "./generated/ManifestTypes";
import CollectData from "./dropdownData/generateData";
import {DATA} from "./dropdownData/generateData"

export class Testing implements ComponentFramework.StandardControl<IInputs, IOutputs> {

    private _inputElement: HTMLInputElement;
    private _inputValue: string;
    private _notifyOutputChanged: () => void;

    private _dropdownServer: HTMLSelectElement;
    private _dropdownServerValue: string;

    private _dropdownProject: HTMLSelectElement;
    private _dropdownProjectValue: string;

    private _USData: string[] | undefined;
    private _EUData: string[] | undefined;
    private _NoneData: string[] | undefined;

    private data: DATA;
    
    // private _USDropdown: HTMLOptGroupElement;
    // private _EUDropdown: HTMLOptGroupElement;
    // private _NoneDropDown: HTMLOptGroupElement;
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
        CollectData().then((resolve) => {
            
            this.data = resolve

            this._USData = this.data.US;
            this._EUData = this.data.EU;
            this._NoneData = this.data.None;

            // Add control initialization code
            this._inputElement = document.createElement("input");
            this._inputElement.setAttribute("type", "text");
            this._inputElement.setAttribute("placeholder", "---");
            this._notifyOutputChanged = notifyOutputChanged;


            this._dropdownServer = document.createElement("select");
            const dummy = document.createElement("option");
            dummy.text = "";
            dummy.value = "";
            const US = document.createElement("option");
            US.text = "US";
            US.value = "US";
            const EU = document.createElement("option");
            EU.text = "EU";
            EU.value = "EU";
            this._dropdownServer.add(US)
            this._dropdownServer.add(EU)

            this._dropdownProject = document.createElement("select");
            const initData = document.createElement("option");
            initData.text = "";
            initData.value = "";
            this._dropdownProject.add(initData)

            // Extract the input value and update the input element
            this._inputValue = context.parameters.inputValue.raw || "";
            this._inputElement.value = this._inputValue;

            this._dropdownServerValue = context.parameters.inputValue2.raw || "";
            this._dropdownServer.value = this._dropdownServerValue

            this._dropdownProjectValue = context.parameters.inputValue3.raw || "";
            this._dropdownProject.value = this._dropdownProjectValue


            this._dropdownServer.addEventListener("change", this.onChange);
        }). then(() => {
            container.appendChild(this._inputElement);
            container.appendChild(this._dropdownServer);
            container.appendChild(this._dropdownProject);
        })
    }


    /**
     * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.
     * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions
     */
    public updateView(context: ComponentFramework.Context<IInputs>): void
    {
        // Add code to update control view
        this._inputValue = context.parameters.inputValue.raw || "";
        this._inputElement.value = this._inputValue;

        this._dropdownServerValue = context.parameters.inputValue2.raw || "";
        this._dropdownServer.value = this._dropdownServerValue
    }

    /**
     * It is called by the framework prior to a control receiving new data.
     * @returns an object based on nomenclature defined in manifest, expecting object[s] for property marked as “bound” or “output”
     */
    public getOutputs(): IOutputs
    {
        return {
            inputValue: this._inputValue,
            inputValue2: this._dropdownServerValue
          };
    }

    /**
     * Called when the control is to be removed from the DOM tree. Controls should use this call for cleanup.
     * i.e. cancelling any pending remote calls, removing listeners, etc.
     */
    public destroy(): void
    {
        // Add code to cleanup control if necessary
    }

    public onChange = (event: Event): void => {
		this._dropdownServerValue = this._dropdownServer.value;
		this._notifyOutputChanged();
	}
}
