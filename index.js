/**
 * @file 入口模块
 * @author sparklewhy@gmail.com
 */

'use strict';

var path = require('path');

/**
 * 创建文件
 *
 * @param {string} filePath 相对于项目根目录的文件路径
 * @param {string=} content 文件内容
 * @param {Object=} options 附加文件选项
 * @return {File}
 */
function createFile(filePath, content, options) {
    var file = fis.file.wrap(path.join(fis.project.getProjectPath(), filePath));

    if (arguments.length === 2) {
        if (content && !fis.util.isString(content)) {
            options = content;
            content = null;
        }
    }

    content != null && file.setContent(content);
    options && Object.keys(options).forEach(function (k) {
        file[k] = options[k];
    });

    return file;
}

function addFile(ret, file) {
    var subPath = file.subpath;

    ret.src[subPath] = file;
    ret.map.res[file.id] = file;

    ret.pkg[subPath] = file;
}

function prepack(ret, conf, settings, opt) {
    var assign = fis.util.assign;
    var opts = assign({}, exports.DEFAULT_OPTIONS, settings);
    opts.babelHelperFileOption = assign(
        {},
        exports.DEFAULT_OPTIONS.babelHelperFileOption,
        settings.babelHelperFileOption || {}
    );

    var src = ret.src;
    var babelHelpers = [];
    Object.keys(src).forEach(function (item) {
        var helpers = src[item].extras.babelHelpers;
        (helpers || []).forEach(function (item) {
            if (babelHelpers.indexOf(item) === -1) {
                babelHelpers.push(item);
            }
        });
    });

    var code = exports.babel.buildExternalHelpers(
        babelHelpers, opts.babelHelperCodeStyle
    );
    var babelHelperFile = createFile(
        opts.babelHelperFileName, code,
        opts.babelHelperFileOption
    );
    addFile(ret, babelHelperFile);

    fis.compile.process(babelHelperFile);
}

module.exports = exports = prepack;

exports.babel = null;

exports.DEFAULT_OPTIONS = {
    babelHelperFileName: 'src/babelHelpers.js',
    babelHelperCodeStyle: 'umd',
    babelHelperFileOption: {
        useHash: false,
        relative: true,
        disableBabel: true,
        disableWrap: true
    }
};
