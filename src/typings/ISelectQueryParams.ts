// Copyright (c) 2022 Maxim "maxqwars" Maximenko <maxqwars@gmail.com>
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import INCLUDED_RESOURCES from '../constants/INCLUDED_RESOURCES';

export interface ISelectQueryParams {
  filter?: string[];
  include?: INCLUDED_RESOURCES[];
  remove?: string[];
}
