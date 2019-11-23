// @flow
/* eslint eqeqeq: "off" */

import {Component} from 'react';
import * as React from 'react';


/**
 * Renders an information card using Bootstrap classes
 */
export class Card extends Component<{ title: React.Node, children?: React.Node }> {
    render() {
        return (
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">{this.props.title}</h5>
                    <div className="card-text">{this.props.children}</div>
                </div>
            </div>
        );
    }
}

/**
 * Renders a row using Bootstrap classes
 */
export class Row extends Component<{ children?: React.Node }> {
    render() {
        return <div className="row">{this.props.children}</div>;
    }
}




/**
 * Renders a column with specified width using Bootstrap classes
 */
export class Column extends Component<{ width?: number, right?: boolean, children?: React.Node }> {
    render() {
        return (
            <div
                className={'col' + (this.props.width ? '-' + this.props.width : '') + (this.props.right ? ' text-right' : '')}
            >
                {this.props.children}
            </div>
        );
    }
}

