import * as React from 'react';
import { sp } from "@pnp/sp";
import { DetailsList, DetailsListLayoutMode, Selection, SelectionMode, IColumn } from 'office-ui-fabric-react/lib/DetailsList';

export interface IProduct {
  Title: string;
  ProductType: string;
  Description: string;
}

export interface IProductListProps {
  documentType: string;
}

export interface IProductListState {
  items: IProduct[];
}

export default class ProductList extends React.Component<IProductListProps, IProductListState> {
  constructor(props: IProductListProps) {
    super(props);

    this.state = {
      items: [],
    };
  }

  public componentDidMount() {
    this.GetItems(this.props.documentType);
  }

  public componentWillReceiveProps(nextProps: IProductListProps) {
    if (nextProps.documentType != this.props.documentType) {
      this.GetItems(nextProps.documentType);
    }
  }

  private GetItems(documentType: string) {

    if (documentType == "All") {
      sp.web.lists.getByTitle("products").items
        .select("Title", "ProductType", "Description")
        .get().then(
          results => {
            var newItems: IProduct[] = results.map((r) => { return { Title: r.Title, ProductType: r.ProductType, Description: r.Description } });
            this.setState({ items: newItems });
          }
        );
    }
    else {
      sp.web.lists.getByTitle("products").items
        .select("Title", "ProductType", "Description")
        .filter(`ProductType eq '${documentType}'`)
        .get().then(
          results => {
            var newItems: IProduct[] = results.map((r) => { return { Title: r.Title, ProductType: r.ProductType, Description: r.Description } });
            this.setState({ items: newItems });
          }
        );
    }
  }

  public render(): React.ReactElement<IProductListProps> {
    return (
      <DetailsList
        items={this.state.items}
        compact={true}
        isHeaderVisible={true}
      />
    );
  }
}
