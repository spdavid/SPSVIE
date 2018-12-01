import * as React from 'react';
import { Dropdown, IDropdown, DropdownMenuItemType, IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';
import { sp, Items } from "@pnp/sp";

export interface IDocumentTypeFilterProps {
    prodTypeChanged : (newDocType : string) => void;
}

export interface IDocumentTypeFilterState {
  items : IDropdownOption[];
}

export default class DocumentTypeFilter extends React.Component<IDocumentTypeFilterProps, IDocumentTypeFilterState> {
  constructor(props: IDocumentTypeFilterProps) {
    super(props);

    this.state = {
      items : []
    };
  }

  public componentDidMount()
  {
      sp.web.lists.getByTitle("Products").fields.getByInternalNameOrTitle("ProductType").select("Choices").get().then(
        field => {
          console.log(field.Choices);
          var options : IDropdownOption[] = field.Choices.map(choice => {return { key: choice, text: choice }});
          options.unshift({key:"All", text:"All"});
          this.setState({items : options});
        }
      );
  }

  public render(): React.ReactElement<IDocumentTypeFilterProps> {
    return (
      <div>
        <Dropdown
        onChanged={this.productChanged}
          options={this.state.items}
        />
      </div>
    );
  }

  private productChanged = (option: IDropdownOption) => {
      this.props.prodTypeChanged(option.text);
  }
}
