import { UrlExtractor } from "../../src/lib/utils/UrlExtractor";
import Assert = require("assert");

describe("test DomainExtractor", function () {
  describe("test fromUrl", function () {
    it("should return all components of the HTTP url", function () {
      const components = UrlExtractor
        .fromUrl("http://www.example.com:8080/test/abc?param=test&param2=testagain");
      Assert.deepEqual(components, {
        scheme: "http",
        domain: "www.example.com",
        port: 8080,
        path: "/test/abc",
        params: "param=test&param2=testagain"
      });
    });

    it("should return all components of the HTTPS url", function () {
      const components = UrlExtractor
        .fromUrl("https://www.example.com:8080/test/abc?param=test&param2=testagain");
      Assert.deepEqual(components, {
        scheme: "https",
        domain: "www.example.com",
        port: 8080,
        path: "/test/abc",
        params: "param=test&param2=testagain"
      });
    });

    it("should return port 80 when no port is provided", function () {
      const components = UrlExtractor
        .fromUrl("https://www.example.com/test/abc?param=test&param2=testagain");
      Assert.deepEqual(components, {
        scheme: "https",
        domain: "www.example.com",
        port: 80,
        path: "/test/abc",
        params: "param=test&param2=testagain"
      });
    });

    it("should return no params when there is none", function () {
      const components = UrlExtractor
        .fromUrl("https://www.example.com/test/abc");
      Assert.deepEqual(components, {
        scheme: "https",
        domain: "www.example.com",
        port: 80,
        path: "/test/abc",
        params: ""
      });
    });

    it("should return no path when there is none", function () {
      const components = UrlExtractor
        .fromUrl("https://www.example.com?param=test&param2=testagain");
      Assert.deepEqual(components, {
        scheme: "https",
        domain: "www.example.com",
        port: 80,
        path: "",
        params: "param=test&param2=testagain"
      });
    });
  });
});