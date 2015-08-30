/**
 * Created by webadnan on 8/29/15.
 */
/**
 *
 * @param conditionFunction, callback will be fired if this condition is true
 * @param success
 * @param failure, will be called when try expires
 * @param expire, upto expire time it will keep trying
 * @param interval, the duration between two tries
 * @returns {*}
 *
 * To the users: please destroy this when element is destroyed
 * USAGES
 * var waitFor = WaitFor(c, s, f);
 * element.on('$destroy', function(){ waitFor.stop() });
 */
"use strict";

function WaitFor(conditionFunction, success, failure, expire, interval) {
    interval = _und(interval, 100);
    expire = _und(expire, 5 * 1000); // 5 secs
    failure = failure || function () {};
    var timerId = 0,
        enable = true,
        successCalled = false,
        failureCalled = false;
    _check(0);

    function _callFailure() {
        timerId = 0;
        if (!failureCalled && !successCalled) {
            failureCalled = true;
            failure();
        }
    }

    function _check(cnt) {
        if (!enable) return;
        if (interval * cnt >= expire) return _callFailure();

        if (conditionFunction()) {
            timerId = 0;
            successCalled = true;
            success();
        } else if (enable) {
            timerId = setTimeout(_check, interval, cnt + 1);
        }
    }

    function _stop() {
        enable = false;
        if (timerId > 0) {
            clearTimeout(timerId);
            timerId = 0;
        }
        _callFailure();
    }

    return { stop: _stop };
}

//# sourceMappingURL=util-compiled.js.map