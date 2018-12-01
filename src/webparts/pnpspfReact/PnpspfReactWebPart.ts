import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'PnpspfReactWebPartStrings';
import PnpspfReact from './components/PnpspfReact';
import { IPnpspfReactProps } from './components/IPnpspfReactProps';

export interface IPnpspfReactWebPartProps {
  description: string;
}

export default class PnpspfReactWebPart extends BaseClientSideWebPart<IPnpspfReactWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IPnpspfReactProps > = React.createElement(
      PnpspfReact,
      {
        description: this.properties.description
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
