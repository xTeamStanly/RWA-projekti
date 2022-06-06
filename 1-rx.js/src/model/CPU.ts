import { Component } from "./Component";

export interface CPU extends Component {
    frequency: number;
    cores: number;
}