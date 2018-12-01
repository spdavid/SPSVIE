import * as React from 'react';
import styles from './SpsvieSolution.module.scss';
import { ISpsvieSolutionProps } from './ISpsvieSolutionProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { Panel, PanelType } from 'office-ui-fabric-react/lib/Panel';
import DocumentTypeFilter from './DocumentTypeFilter';
import ProductList from './ProductList';


export interface ISpsvieSolutionState {

  showPanel : boolean;
  productType : string;
}

export default class SpsvieSolution extends React.Component<ISpsvieSolutionProps, ISpsvieSolutionState> {

  constructor(props: ISpsvieSolutionProps) {
    super(props);
    this.state = {
      showPanel :false,
      productType : "All"
    };
  }

  public render(): React.ReactElement<ISpsvieSolutionProps> {
    return (
      <div className={styles.spsvieSolution}>
        <div className="ms-fontSize-xxl">
         Product List <i onClick={this.openPanel} className={"ms-Icon ms-Icon--FilterSolid " + styles.filterIcon} aria-hidden="true"></i>
            </div>
        <div>
        <ProductList documentType={this.state.productType} />
        </div>
        <Panel
          isOpen={this.state.showPanel}
          type={PanelType.smallFixedFar}
          headerText="Filter by ProductType"
          closeButtonAriaLabel="Close"
          isBlocking={false}>
          <DocumentTypeFilter prodTypeChanged={this.filterChanged}></DocumentTypeFilter>
        </Panel>
      </div>
    );
  }

  private filterChanged = (newProdType : string) => {
    this.setState({productType : newProdType});
  }


  private openPanel = () => {
      this.setState({showPanel : true});

  }
}
