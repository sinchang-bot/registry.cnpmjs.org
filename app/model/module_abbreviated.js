'use strict';

/*
CREATE TABLE IF NOT EXISTS `module_abbreviated` (
 `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT COMMENT 'primary key',
 `gmt_create` datetime(6) NOT NULL COMMENT 'create time',
 `gmt_modified` datetime(6) NOT NULL COMMENT 'modified time',
 `name` varchar(214) CHARACTER SET ascii COLLATE ascii_general_ci NOT NULL COMMENT 'module name',
 `version` varchar(100) CHARACTER SET ascii COLLATE ascii_general_ci NOT NULL COMMENT 'module version',
 `package` longtext COMMENT 'the abbreviated metadata',
 `publish_time` bigint(20) unsigned COMMENT 'the publish time',
 PRIMARY KEY (`id`),
 UNIQUE KEY `uk_name_version` (`name`,`version`),
 KEY `idx_gmt_modified` (`gmt_modified`),
 KEY `idx_publish_time` (`publish_time`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE utf8mb4_unicode_ci COMMENT='module abbreviated info';
*/

module.exports = app => {
  const { STRING, BIGINT, TEXT, DATE } = app.Sequelize;

  const Model = app.model.define('ModuleAbbreviated', {
    id: {
      type: BIGINT(20).UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },
    gmt_create: {
      type: DATE(6),
      allowNull: false,
    },
    gmt_modified: {
      type: DATE(6),
      allowNull: false,
    },
    name: {
      type: STRING(214),
      allowNull: false,
      comment: 'module name',
      charset: 'ascii',
      collate: 'ascii_general_ci',
    },
    version: {
      type: STRING(100),
      allowNull: false,
      comment: 'module version',
      charset: 'ascii',
      collate: 'ascii_general_ci',
    },
    package: {
      type: TEXT('long'),
      comment: 'package.json',
    },
    publish_time: {
      type: BIGINT(20).UNSIGNED,
      allowNull: true,
    },
  }, {
    tableName: 'module_abbreviated',
    comment: 'module abbreviated info',
    indexes: [
      {
        name: 'uk_name_version',
        unique: true,
        fields: [ 'name', 'version' ],
      },
      {
        name: 'idx_gmt_modified',
        fields: [ 'gmt_modified' ],
      },
      {
        name: 'idx_publish_time',
        fields: [ 'publish_time' ],
      },
    ],
  });

  Object.assign(Model, {
    async findByNameAndVersion(name, version) {
      return await this.find({
        where: { name, version },
      });
    },
  });

  return Model;
};
