import * as React from 'react';
import styles from './Spsviedemo.module.scss';
import { ISpsviedemoProps } from './ISpsviedemoProps';
import { escape } from '@microsoft/sp-lodash-subset';
import ProductList from './ProductList';
import { Panel, PanelType } from 'office-ui-fabric-react/lib/Panel';
import DocumentTypeFilter from './DocumentTypeFilter';

export interface ISPSDemoState {
  showPanel: boolean;
  productType : string;
}


export default class Spsviedemo extends React.Component<ISpsviedemoProps, ISPSDemoState> {

  constructor(props: ISpsviedemoProps) {
    super(props);
    this.state = {
      showPanel: false,
      productType : "All"
    };
  }


  public render(): React.ReactElement<ISpsviedemoProps> {
    return (
      <div className={styles.spsviedemo}>
        <div className="ms-fontSize-xxl">
          Product List
          <i onClick={this.openPanel} className={"ms-Icon ms-Icon--FilterSolid "} aria-hidden="true">
          </i>
        </div>
        <div>
          <ProductList documentType={this.state.productType}></ProductList>
          {/* <ProductList documentType={this.state.productType} /> */}
        </div>
        <Panel
          isOpen={this.state.showPanel}
          type={PanelType.smallFixedFar}
          headerText="Filter by ProductType"
          closeButtonAriaLabel="Close"
          isBlocking={false}>
          <DocumentTypeFilter prodTypeChanged={this.filterChanged} ></DocumentTypeFilter>
        </Panel>
        {/* prodTypeChanged={this.filterChanged} */}
      </div>
    );
  }

  private openPanel = () => {
    this.setState({ showPanel: true });
  }

  private filterChanged = (newProdType: string) => {
    this.setState({ productType: newProdType });
  }




}
