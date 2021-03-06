/* eslint-disable camelcase */
/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
export enum ColumnType {
  DOUBLE = 'DOUBLE',
  FLOAT = 'FLOAT',
  INT = 'INT',
  BIGINT = 'BIGINT',
  LONG = 'LONG',
  REAL = 'REAL',
  NUMERIC = 'NUMERIC',
  DECIMAL = 'DECIMAL',
  MONEY = 'MONEY',
  DATE = 'DATE',
  TIME = 'TIME',
  DATETIME = 'DATETIME',
  VARCHAR = 'VARCHAR',
  STRING = 'STRING',
  CHAR = 'CHAR',
}

/**
 * Column information defined in datasource.
 */
export interface Column {
  id: number;
  type: ColumnType;
  columnName: string;
}

export default {};
