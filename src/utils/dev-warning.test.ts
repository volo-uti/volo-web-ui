import { describe, expect, it, vi, beforeEach } from "vitest";

// devWarning uses a module-level Set, so each test has to load the module afresh
describe("devWarning", () => {
  let warnSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});
    vi.resetModules();
  });

  it("warns in development mode", async () => {
    vi.stubEnv("NODE_ENV", "development");

    const { devWarning } = await import("./dev-warning");
    devWarning("VSlider", "min must be less than max");

    expect(warnSpy).toHaveBeenCalledWith("[Volo/VSlider] min must be less than max");

    vi.unstubAllEnvs();
    warnSpy.mockRestore();
  });

  it("does not warn in production mode", async () => {
    vi.stubEnv("NODE_ENV", "production");

    const { devWarning } = await import("./dev-warning");
    devWarning("VSlider", "min must be less than max");

    expect(warnSpy).not.toHaveBeenCalled();

    vi.unstubAllEnvs();
    warnSpy.mockRestore();
  });

  it("does not warn in test mode", async () => {
    vi.stubEnv("NODE_ENV", "test");

    const { devWarning } = await import("./dev-warning");
    devWarning("VButton", "something wrong");

    expect(warnSpy).not.toHaveBeenCalled();

    vi.unstubAllEnvs();
    warnSpy.mockRestore();
  });

  it("warns only once for the same (component + message) pair", async () => {
    vi.stubEnv("NODE_ENV", "development");

    const { devWarning } = await import("./dev-warning");
    devWarning("VSlider", "duplicate warning");
    devWarning("VSlider", "duplicate warning");
    devWarning("VSlider", "duplicate warning");

    expect(warnSpy).toHaveBeenCalledTimes(1);

    vi.unstubAllEnvs();
    warnSpy.mockRestore();
  });

  it("warns separately for the same message from different components", async () => {
    vi.stubEnv("NODE_ENV", "development");

    const { devWarning } = await import("./dev-warning");
    devWarning("VSlider", "same message");
    devWarning("VButton", "same message");

    expect(warnSpy).toHaveBeenCalledTimes(2);
    expect(warnSpy).toHaveBeenCalledWith("[Volo/VSlider] same message");
    expect(warnSpy).toHaveBeenCalledWith("[Volo/VButton] same message");

    vi.unstubAllEnvs();
    warnSpy.mockRestore();
  });
});
