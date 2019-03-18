import React, { Component } from "react";
import * as firebase from "../../firebase/firebase";
import * as utils from "../Util";

import EditExpensePopup from "./EditExpensePopup";

class MobileExpenseRow extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showEditPopup: false
        };

        this.handleClick = this.handleClick.bind(this);
    }

    // deleting the expense
    handleClick(e) {
        var message = "Once deleted you cannot get back this record , are you sure you want to delete";
        if (window.confirm(message)) {
            firebase.db.ref(`expenseTable/${this.props.user.uid}/${this.props.expenseId}`).remove();
        }
    }

    toggleEditPopup(e) {
        this.setState({
            showEditPopup: !this.state.showEditPopup
        });
    }

    render() {
        const lessFont = { fontSize: "15px", paddingRight: "10px", color: "rgba(255,255,255,.45)" };

        return (
            <div class="option">
                {this.state.showEditPopup ? (
                    <EditExpensePopup
                        user={this.props.user}
                        expense={this.props.expense}
                        closePopup={this.toggleEditPopup.bind(this)}
                        settings={this.props.settings}
                        convertedCurrency={this.props.convertedCurrency}
                    />
                ) : null}
                <input type="checkbox" id={`toggle${this.props.expenseId}`} class="toggle" />
                <label class="title" for={`toggle${this.props.expenseId}`}>
                    {" "}
                    <span class="mobile-row-header">{this.props.expense.value.date}</span>
                    <span class="mobile-row-header">
                        <i
                            className={`fa fa-${utils.categoryIcon(this.props.expense.value.category)}`}
                            style={lessFont}
                            aria-hidden="true"
                        />
                        <span class="truncate"> {this.props.expense.value.comments} </span>
                    </span>
                    <span class="mobile-row-header last-item">
                        <i className={`fa ${utils.setCurrencyIcon(this.props.settings.currency)}`} aria-hidden="true" />{" "}
                        {this.props.expense.value.expense}
                    </span>
                </label>
                <div class="content">
                    <p>
                        {this.props.expense.value.category} - {this.props.expense.value.comments}
                    </p>
                    <button className="edit-btn edit-btn-mobile" onClick={this.toggleEditPopup.bind(this)}>
                        <i className="fa fa-edit" aria-hidden="true" /> edit
                    </button>
                    <button className="delete-btn delete-btn-mobile" onClick={this.handleClick}>
                        <i className="fa fa-trash-o" aria-hidden="true" /> delete
                    </button>
                </div>
            </div>
        );
    }
}

export default MobileExpenseRow;