// Copyright (c) 2022 Maxim "maxqwars" Maximenko <maxqwars@gmail.com>
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import API_VERSION from '../constants/API_VERSION';
import API_ENDPOINT from '../constants/API_ENDPOINTS';
import { Title } from '../typings/Title';
import GetTitleQueryBuilder from '../classes/GetTitleQueryBuilder';
import RequestUrlBuilder from '../core/RequestURLBuilder';
import CoreModule from './CoreModule';
import titleParser from '../functions/TitleParser';
import { RawTitle } from '../typings/RawTitle';
import { APIError } from '../typings/APIError';
import { IGetTitleQueryParams } from '../typings/IGetTitleQueryParams';

type DatabaseOptions = {
  baseUrl: string;
  version: API_VERSION;
  useHttps: boolean;
  timeout: number;
};

export default class Database extends CoreModule {
  private options: DatabaseOptions;

  constructor(options: DatabaseOptions) {
    super();
    this.options = options;
  }

  async getRandomTitle(
    params: IGetTitleQueryParams
  ): Promise<Title | APIError | Error> {
    let apiResponse: Object;

    const Q_BUILD = new GetTitleQueryBuilder();

    const U_BUILD = new RequestUrlBuilder(
      this.options.baseUrl,
      this.options.version,
      this.options.useHttps
    );

    U_BUILD.setEndpoint(API_ENDPOINT.GET_RANDOM_TITLE);

    Q_BUILD.setId(params.id)
      .setCode(params.code)
      .setFilter(params.filter)
      .setRemove(params.remove)
      .setInclude(params.include)
      .setTorrentId(params.torrentId)
      .setPlaylistType(params.playlistType)
      .setDescriptionType(params.descriptionType);

    U_BUILD.setQueryParams(Q_BUILD.build());

    const FINAL_URL = U_BUILD.build();

    try {
      apiResponse = await (
        await this.fetchWithTimeout(FINAL_URL, this.options.timeout)
      ).json();
    } catch (e) {
      throw new Error('Unexpected error');
    }

    // eslint-disable-next-line no-prototype-builtins
    return apiResponse.hasOwnProperty('error')
      ? (apiResponse as APIError)
      : titleParser(apiResponse as RawTitle);
  }

  async getTitle(
    params: IGetTitleQueryParams
  ): Promise<Title | APIError | Error> {
    let apiResponse: Object;

    const Q_BUILD = new GetTitleQueryBuilder();

    const U_BUILD = new RequestUrlBuilder(
      this.options.baseUrl,
      this.options.version,
      this.options.useHttps
    );

    U_BUILD.setEndpoint(API_ENDPOINT.GET_TITLE);

    Q_BUILD.setId(params.id)
      .setCode(params.code)
      .setFilter(params.filter)
      .setRemove(params.remove)
      .setInclude(params.include)
      .setTorrentId(params.torrentId)
      .setPlaylistType(params.playlistType)
      .setDescriptionType(params.descriptionType);

    U_BUILD.setQueryParams(Q_BUILD.build());

    const FINAL_URL = U_BUILD.build();

    try {
      apiResponse = await (
        await this.fetchWithTimeout(FINAL_URL, this.options.timeout)
      ).json();
    } catch (e) {
      throw new Error('Unexpected error');
    }

    // eslint-disable-next-line no-prototype-builtins
    return apiResponse.hasOwnProperty('error')
      ? (apiResponse as APIError)
      : titleParser(apiResponse as RawTitle);
  }
}
